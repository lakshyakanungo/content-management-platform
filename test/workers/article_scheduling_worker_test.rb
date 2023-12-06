# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class ArticleSchedulingWorkerTest < ActiveSupport::TestCase
  include SidekiqHelper

  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)

    new_title = "Updated title"
    article_params = {
      title: new_title, status: "draft", category_id: @category.id,
      body: "Test body", user_id: @user.id,
      scheduled_time: 10.minutes.from_now.utc.to_s
    }
    ArticleSchedulingService.new(@article, article_params).process
  end

  def test_scheduling_worker_should_delete_schedule
    assert @article.schedule
    assert_equal 1, ArticleSchedulingWorker.jobs.size

    ArticleSchedulingWorker.drain
    assert_nil @article.reload.schedule
    assert_equal 0, ArticleSchedulingWorker.jobs.size
  end
end
