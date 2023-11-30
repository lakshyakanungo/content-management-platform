# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Articles::AnalyticsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
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
end
