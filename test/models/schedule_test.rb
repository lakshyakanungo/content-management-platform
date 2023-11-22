# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "draft",
      user_id: @user.id,
      category_id: @category.id)
    @schedule = @article.create_schedule!(time: 10.minutes.from_now, job_id: "xyz")
  end

  def test_schedule_should_not_be_valid_without_article_id
    @schedule.article_id = nil
    assert_not @schedule.save
    assert_includes @schedule.errors.full_messages, "Article must exist"
  end

  def test_schedule_should_not_be_valid_without_time
    @schedule.time = nil
    assert_not @schedule.save
    assert_includes @schedule.errors.full_messages, "Time can't be blank"
  end

  def test_schedule_should_not_be_valid_without_job_id
    @schedule.job_id = nil
    assert_not @schedule.save
    assert_includes @schedule.errors.full_messages, "Job can't be blank"
  end
end
