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

  # def test_should_list_all_articles_and_in_correct_ordering
  #   get(articles_path, headers:)
  #   assert_response :success
  #   response_json = response_body

  #   all_articles = response_json["articles"]

  #   expected_all_articles_ids = Article.order(updated_at: :desc).pluck(:id)
  #   expected_draft_articles_ids = Article.where(status: "draft").order(updated_at: :desc).pluck(:id)
  #   expected_published_articles_ids = Article.where(status: "published").order(updated_at: :desc).pluck(:id)

  #   actual_all_articles_ids = all_articles["all"].pluck("id")
  #   actual_draft_articles_ids = all_articles["draft"].pluck("id")
  #   actual_published_articles_ids = all_articles["published"].pluck("id")

  #   assert_equal expected_all_articles_ids, actual_all_articles_ids
  #   assert_equal expected_draft_articles_ids, actual_draft_articles_ids
  #   assert_equal expected_published_articles_ids, actual_published_articles_ids
  # end

  # def test_should_list_grouped_articles
  #   get(grouped_by_category_articles_path, headers:)
  #   assert_response :success
  #   response_json = response_body

  #   grouped_articles = response_json["grouped_articles"]

  #   expected_group_names = []
  #   expected_article_ids_by_group = []

  #   Article.joins(:category).group_by { |article| article.category.name }.to_a.each do |group|
  #     expected_article_ids_by_group << group[1].pluck("id")
  #     expected_group_names << group[0]
  #   end

  #   expected_group_names = expected_group_names.sort
  #   expected_article_ids_by_group = expected_article_ids_by_group.flatten.sort

  #   actual_group_names = grouped_articles.map { |group| group[0] }.sort
  #   actual_articles_ids_by_group = grouped_articles.map { |group| group[1].pluck("id") }.flatten.sort

  #   assert_equal expected_group_names, actual_group_names
  #   assert_equal expected_article_ids_by_group, actual_articles_ids_by_group
  # end

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

  def test_search_results_should_list_articles
    query = "a"
    status = "draft"
    category_id = [@category.id]

    get(search_articles_path(title: query, status:, category_id:), headers:)
    assert_response :success
    response_json = response_body

    puts response_json, "response"

    search_articles = response_json["articles"]

    expected_search_results = Article.by_status(status:)
      .by_categories(category_id:)
      .where("lower(title) LIKE ?", "%#{query}%")
      .includes(:category)
      .order(updated_at: :desc)
      .to_a

    actual_search_results = search_articles.pluck("id")

    puts actual_search_results, "actual"
    puts expected_search_results, "expected"

    assert_equal expected_search_results, actual_search_results
  end
end
