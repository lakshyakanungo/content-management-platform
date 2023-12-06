# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Api::V1::Articles::VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = create(:article, user_id: @user.id, category_id: @category.id)
  end

  def test_should_restore_article_version
    @article.update!(title: "New title")
    @article.reload
    previous_version = @article.versions.last
    put(
      api_v1_articles_restore_version_path(
        id: @article.id, params: {
          article: { version_id: previous_version.id }
        }), headers:)

    assert_response :success
    assert_equal @article.reload.title, previous_version.object["title"]
    assert_equal t("article.restored"), response_body["notice"]
  end

  def test_should_not_restore_version_with_deleted_category
    new_category = create(:category, user_id: @user.id, site_id: @site.id)
    @article.update!(category_id: new_category.id)
    @article.update!(category_id: @category.id)

    @article.reload
    new_category.delete
    version_with_category_deleted = @article.versions.last
    put(
      api_v1_articles_restore_version_path(
        id: @article.id, params: {
          article: { version_id: version_with_category_deleted.id }
        }), headers:)
    assert_response :unprocessable_entity
  end
end
