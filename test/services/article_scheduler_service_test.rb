# frozen_string_literal: true
# # frozen_string_literal: true

# require "test_helper"
# require "sidekiq/testing"

# class ArticleSchedulerServiceTest < ActiveSupport::TestCase
#   def setup
#     @user = create(:user)
#     @category = Category.create!(name: "Test category", user_id: @user.id)
#     @article = Article.create!(
#       title: "Test article", body: "<p>Test body</p>", status: "draft",
#       user_id: @user.id,
#       category_id: @category.id)
#     @article_scheduler_service = ArticleSchedulerService.new @article
#   end

#   def test_process_should_enqueue_job
#     new_title = "Updated title"
#     article_params = {
#       article: {
#         title: new_title, status: "draft", category_id: @category.id,
#         body: "Test body", user_id: @user.id,
#         scheduled_time: 10.minutes.from_now
#       }
#     }
#     @article_scheduler_service.process article_params
#     assert_enqueued_with(
#       job: ArticleUpdaterJob, at: 10.minutes.from_now,
#       args: [@article, article_params.except(:scheduled_time)])
#     perform_enqueued_jobs
#     assert_performed_jobs 1
#   end
# end
