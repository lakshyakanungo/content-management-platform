# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class ArticleUpdaterJobTest < ActiveJob::TestCase
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
    @article.create_schedule!(time: Time.now.utc, job_id: "test")
  end

  def test_article_gets_updated_by_job
    article_params = {
      title: "New title"
    }
    ArticleUpdaterJob.perform_now(@article, article_params)
    assert_equal "New title", @article.reload.title
  end

  def test_article_gets_removed_from_schedule_after_performing_job
    assert @article.schedule.present?
    assert_difference -> { Schedule.count }, -1 do
      article_params = {
        title: "New title"
      }
      ArticleUpdaterJob.perform_now(@article, article_params)
    end

    assert_nil @article.reload.schedule
  end
end
