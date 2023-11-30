# frozen_string_literal: true

require "test_helper"

class ArticleFilteringServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category1 = Category.create!(name: "Test category", user_id: @user.id)
    @category2 = Category.create!(name: "Test category 2", user_id: @user.id)
    Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category1.id)
    Article.create!(
      title: "Test article 2", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category1.id)
    Article.create!(
      title: "Test article 3", body: "<p>Test body</p>", status: "published",
      user_id: @user.id,
      category_id: @category1.id)
    Article.create!(
      title: "Test article 4", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category2.id)
  end

  def test_process_should_list_articles_and_in_correct_order
    title = "a"
    status = "draft"
    category_id = [@category1.id]

    test_params = {
      title:,
      status:,
      category_id:
    }

    actual_filtered_articles = ArticleFilteringService.new(@user, test_params).process

    query = title.downcase
    expected_filtered_articles = @user.articles
      .where(status:)
      .where(category_id:)
      .where("lower(title) LIKE ?", "%#{query}%")
      .includes(:category)
      .order(updated_at: :desc)

    actual_filtered_articles_ids = actual_filtered_articles.pluck("id").sort
    expected_filtered_articles_ids = expected_filtered_articles.pluck("id").sort

    assert_equal expected_filtered_articles_ids, actual_filtered_articles_ids
  end
end
