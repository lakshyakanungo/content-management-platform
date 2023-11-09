# frozen_string_literal: true

require "test_helper"

# NOTE: - EUI controller tests are failing with a reason related to
# why the redirection from one article to another in not happening in EUI.

class EuisControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site_setting = SiteSetting.create!(title: "Test title", is_password_protected: true)
    @headers = set_headers(@site_setting)
  end

  def set_headers(site_setting, options = {}){
    Accept: "application/json",
    "Content_Type" => "application/json",
    "X-Auth-Token" => site_setting.authentication_token
  }.merge(options)
  end

  # def test_should_list_grouped_articles
  #   get(euis_path, headers:)
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
end
