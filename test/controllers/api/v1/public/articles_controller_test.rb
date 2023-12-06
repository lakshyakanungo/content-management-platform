# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "published",
      user_id: @user.id,
      category_id: @category.id)
    @headers = set_headers(@site)
  end

  def set_headers(site, options = {}){
    Accept: "application/json",
    "Content_Type" => "application/json",
    "X-Auth-Token" => site.authentication_token
  }.merge(options)
  end

  def test_should_list_grouped_articles
    get(api_v1_public_articles_path, headers: @headers)
    assert_response :success
    response_json = response_body

    grouped_articles = response_json["grouped_articles"]

    expected_group_names = []
    expected_article_ids_by_group = []

    Article.joins(:category).group_by { |article| article.category.name }.to_a.each do |group|
      expected_article_ids_by_group << group[1].pluck("id")
      expected_group_names << group[0]
    end

    expected_group_names = expected_group_names.sort
    expected_article_ids_by_group = expected_article_ids_by_group.flatten.sort

    actual_group_names = grouped_articles.map { |group| group[0] }.sort
    actual_articles_ids_by_group = grouped_articles.map { |group| group[1].pluck("id") }.flatten.sort

    assert_equal expected_group_names, actual_group_names
    assert_equal expected_article_ids_by_group, actual_articles_ids_by_group
  end

  def test_search_results_should_list_articles
    search_term = "ru"

    get(search_api_v1_public_articles_path(search_term:), headers: @headers)
    assert_response :success
    response_json = response_body

    search_articles = response_json["articles"]

    expected_search_results = Article.published
      .where("lower(title) LIKE :search_term OR lower(body) LIKE :search_term", search_term: "%#{search_term}%")
      .pluck(:id).sort

    actual_search_results = search_articles.pluck("id").sort

    assert_equal expected_search_results, actual_search_results
  end

  def test_should_respond_with_article
    get(
      api_v1_public_article_path(slug: @article.slug), headers: @headers)
    assert_response :success

    response_json = response_body
    expected_article_id = response_json["article"]["id"]

    actual_article_id = @article.id

    assert_equal expected_article_id, actual_article_id
  end
end
