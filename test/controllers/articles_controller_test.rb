# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
  end

  def test_should_list_correct_articles_count
    get(articles_path, headers:)
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

    get(search_articles_path(title: query, status:, category_id:), headers:)
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
      articles_path,
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
    new_article = Article.create!(
      title: "Test article 2", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)

    new_title = "Updated title"
    article_params = {
      article: {
        title: new_title, status: "published", category_id: @category.id,
        body: "Test body", user_id: @user.id
      }
    }

    patch(article_path(new_article), params: article_params, headers:)

    assert_response :success
    new_article.reload
    assert_equal new_title, new_article.title
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.id), headers:
    end

    assert_response :ok
  end

  def test_should_respond_with_article
    get(
      article_path(id: @article.id), headers:)
    assert_response :success

    response_json = response_body
    expected_article_id = response_json["article"]["id"]

    actual_article_id = @article.id

    assert_equal expected_article_id, actual_article_id
  end

  def test_should_restore_article_version
    @article.update!(title: "New title")
    previous_version = @article.versions.last
    put(
      restore_version_articles_path(
        id: @article.id, params: {
          article: { version_id: previous_version.id }
        }), headers:)

    assert_response :success
    assert_equal @article.reload.title, previous_version.object["title"]
    assert_equal t("article.restored"), response_body["notice"]
  end

  def test_should_list_articles_in_analytics_and_in_correct_order
    get(analytics_articles_path(order_by: "desc"), headers:)
    assert_response :success
    actual_articles = response_body["articles"]

    expected_articles = Article.published.order(visits: "desc")

    actual_article_ids = actual_articles.pluck("id")
    expected_article_ids = expected_articles.pluck("id")

    assert_equal expected_article_ids, actual_article_ids
  end

  def test_article_should_get_updated_if_scheduled_time_in_past
    Sidekiq::Testing.inline!
    new_title = "Updated title"
    article_params = {
      article: {
        title: new_title, status: "draft", category_id: @category.id,
        body: "Test body", user_id: @user.id,
        scheduled_time: 10.minutes.before.utc
      }
    }

    put(
      article_path(
        id: @article.id, params: article_params), headers:)
    assert_response :success
    assert_equal new_title, @article.reload.title
  end

  # def test_article_update_should_get_job_enqueued_if_scheduled_time_in_future
  #   Sidekiq::Testing.inline!
  #   new_title = "Updated title"
  #   scheduled_time = 10.minutes.after.utc
  #   article_params = {
  #     article: {
  #       title: new_title, status: "draft", category_id: @category.id,
  #       body: "Test body", user_id: @user.id,
  #       scheduled_time: scheduled_time.to_s
  #     }
  #   }

  #   put(
  #     article_path(
  #       id: @article.id, params: article_params), headers:)
  #   assert_response :success

  #   assert_enqueued_with(
  #     job: ArticleUpdaterJob, at: scheduled_time.to_s,
  #     args: [@article, article_params.except(:scheduled_time)])
  #   perform_enqueued_jobs

  #   assert_performed_jobs 1
  # end

  def test_article_should_have_zero_visits_after_changing_its_status_to_draft
    article = Article.create!(
      title: "Test article 2", body: "<p>Test body</p>", status: "published",
      user_id: @user.id,
      category_id: @category.id)
    site = Site.create!(title: "Test title", is_password_protected: false)
    @headers = {
      Accept: "application/json",
      "Content_Type" => "application/json",
      "X-Auth-Token" => site.authentication_token
    }

    get(
      public_article_path(slug: article.slug), headers: @headers)
    assert_response :success
    get(
      public_article_path(slug: article.slug), headers: @headers)
    assert_response :success

    assert_equal 2, article.reload.visits

    put(
      article_path(
        id: article.id, params: {
          article: {
            status: "draft"
          }
        }), headers:)
    assert_response :success

    get(
      article_path(id: @article.id), headers:)
    assert_response :success

    assert_equal 0, article.reload.visits
  end
end
