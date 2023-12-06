# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = create(:article, user_id: @user.id, category_id: @category.id)
    @schedule = @article.create_schedule!(job_id: "xyz")
  end

  def test_schedule_should_not_be_valid_without_article_id
    @schedule.article_id = nil
    assert_not @schedule.save
    assert_includes @schedule.errors.full_messages, "Article must exist"
  end

  def test_schedule_should_not_be_valid_without_job_id
    @schedule.job_id = nil
    assert_not @schedule.save
    assert_includes @schedule.errors.full_messages, "Job can't be blank"
  end
end
