# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  include SidekiqHelper

  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = create(:article, user_id: @user.id, category_id: @category.id)
  end

  def test_should_list_correct_articles_count
    get(api_v1_articles_path, headers:)
    assert_response :success
    response_json = response_body

    counts = response_json["counts"]

    expected_all_articles_count = Article.count
    expected_draft_articles_count = Article.draft.count
    expected_published_articles_count = Article.published.count

    actual_all_articles_count = counts["all"]
    actual_draft_articles_count = counts["draft"]
    actual_published_articles_count = counts["published"]

    assert_equal expected_all_articles_count, actual_all_articles_count
    assert_equal expected_draft_articles_count, actual_draft_articles_count
    assert_equal expected_published_articles_count, actual_published_articles_count
  end

  def test_search_results_should_list_articles
    query = "a"
    status = "draft"
    category_id = [@category.id]
    page = 1

    get(search_api_v1_articles_path(title: query, status:, category_id:), headers:)
    assert_response :success
    response_json = response_body

    search_articles = response_json["articles"]

    expected_search_results = Article
      .where(status:)
      .where(category_id:)
      .where("lower(title) LIKE ?", "%#{query}%")
      .includes(:category)
      .order(updated_at: :desc)
      .page(page).per(9)

    actual_search_result_ids = search_articles.pluck("id").sort
    expected_search_result_ids = expected_search_results.pluck("id").sort

    assert_equal expected_search_result_ids, actual_search_result_ids
  end

  def test_should_create_valid_article
    post(
      api_v1_articles_path,
      params: {
        article: {
          title: "Learn Ruby", status: "draft", category_id: @category.id,
          body: "<p>Test body</p>"
        }
      },
      headers:)
    assert_response :success
    response_json = response_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_articles_fields_are_updatable
    new_article = create(:article, user_id: @user.id, category_id: @category.id)

    new_title = "Updated title"
    article_params = {
      article: {
        title: new_title, status: "published", category_id: @category.id,
        body: "Test body", user_id: @user.id
      }
    }

    patch(api_v1_article_path(new_article), params: article_params, headers:)

    assert_response :success
    new_article.reload
    assert_equal new_title, new_article.title
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete api_v1_article_path(@article.id), headers:
    end

    assert_response :ok
  end

  def test_should_respond_with_article
    get(
      api_v1_article_path(id: @article.id), headers:)
    assert_response :success

    response_json = response_body
    expected_article_id = response_json["article"]["id"]

    actual_article_id = @article.id

    assert_equal expected_article_id, actual_article_id
  end

  def test_article_should_have_zero_visits_after_changing_its_status_to_draft
    article = Article.create!(
      title: "Test article 2", body: "<p>Test body</p>", status: "published",
      user_id: @user.id,
      category_id: @category.id)
    site = Site.create!(title: "Test title", is_password_protected: false, user_id: @user.id)
    @headers = {
      Accept: "application/json",
      "Content_Type" => "application/json",
      "X-Auth-Token" => site.authentication_token
    }

    get(
      api_v1_public_article_path(slug: article.slug), headers: @headers)
    assert_response :success
    get(
      api_v1_public_article_path(slug: article.slug), headers: @headers)
    assert_response :success

    assert_equal 2, article.reload.visits

    put(
      api_v1_article_path(
        id: article.id, params: {
          article: {
            status: "draft"
          }
        }), headers:)
    assert_response :success

    get(
      api_v1_article_path(id: @article.id), headers:)
    assert_response :success

    assert_equal 0, article.reload.visits
  end

  def test_article_enqueued_for_scheduled_update_and_article_gets_updated
    new_article = create(:article, user_id: @user.id, category_id: @category.id)

    new_title = "Updated title"
    article_params = {
      article: {
        title: new_title, status: "published", category_id: @category.id,
        body: "Test body", user_id: @user.id, scheduled_time: Time.zone.now + 10.minutes
      }
    }

    scheduled_articles_count = ArticleSchedulingWorker.jobs.size

    patch(api_v1_article_path(new_article), params: article_params, headers:)

    assert_response :success
    assert_equal scheduled_articles_count + 1, ArticleSchedulingWorker.jobs.size

    ArticleSchedulingWorker.drain
    new_article.reload
    assert_equal new_title, new_article.title
  end
end
