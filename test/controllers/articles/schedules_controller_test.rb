# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Articles::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
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
end
