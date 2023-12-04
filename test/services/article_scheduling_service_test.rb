# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class ArticleSchedulingServiceTest < ActiveSupport::TestCase
  include SidekiqHelper

  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
  end

  def test_process_should_enqueue_job_and_also_add_a_schedule
    new_title = "Updated title"
    article_params = {
      title: new_title, status: "draft", category_id: @category.id,
      body: "Test body", user_id: @user.id,
      scheduled_time: 10.minutes.from_now.utc.to_s
    }

    assert_nil @article.schedule
    scheduled_jobs_count = ArticleSchedulingWorker.jobs.size

    ArticleSchedulingService.new(@article, article_params).process

    assert @article.schedule
    assert_equal scheduled_jobs_count + 1, ArticleSchedulingWorker.jobs.size
  end
end
