# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Articles::VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
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
end
