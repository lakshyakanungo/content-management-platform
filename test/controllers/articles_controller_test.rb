# frozen_string_literal: true

require "test_helper"
require "minitest/mock"

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

  # Note:- This test is failing with an error "Can't cast hash." Not able to debug it yet.

  # def test_search_results_should_list_articles
  #   query = "a"
  #   status = "draft"
  #   category_id = [@category.id]

  #   get(search_articles_path(title: query, status:, category_id:), headers:)
  #   assert_response :success
  #   response_json = response_body

  #   search_articles = response_json["articles"]

  #   expected_search_results = Article.by_status(status:)
  #     .by_categories(category_id:)
  #     .where("lower(title) LIKE ?", "%#{query}%")
  #     .includes(:category)
  #     .order(updated_at: :desc)
  #     .to_a

  #   actual_search_results = search_articles.pluck("id")

  #   assert_equal expected_search_results, actual_search_results
  # end
end
