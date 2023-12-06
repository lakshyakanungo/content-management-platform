# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"
require "sidekiq/api"

class Api::V1::Articles::SchedulesControllerTest < ActionDispatch::IntegrationTest
  include SidekiqHelper

  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = create(:article, user_id: @user.id, category_id: @category.id)
  end

  def test_delete_action_should_delete_existing_schedule_and_remove_enqueued_job
    Sidekiq::Testing.disable!

    assert_nil @article.schedule
    new_title = "Updated title"
    article_params = {
      article: {
        title: new_title, status: "draft", category_id: @category.id,
        body: "Test body", user_id: @user.id,
        scheduled_time: Time.zone.now + 1.day
      }
    }
    patch(api_v1_article_path(id: @article.id, params: article_params), headers:)
    assert @article.reload.schedule
    scheduled_articles_count = Sidekiq::ScheduledSet.new.size

    delete(api_v1_articles_delete_scheduled_job_path(id: @article.id), headers:)
    assert_response :success
    assert_nil @article.reload.schedule
    assert_equal scheduled_articles_count - 1, Sidekiq::ScheduledSet.new.size
    Sidekiq::Testing.fake!
  end
end
