# frozen_string_literal: true

require "test_helper"
require "minitest/mock"
require "sidekiq/testing"

class Api::V1::Articles::ReportsControllerTest < ActionDispatch::IntegrationTest
  include SidekiqHelper

  def setup
    @user = create(:user)
    @category = create(:category, user_id: @user.id)
    @article = Article.create!(
      title: "Test article", body: "<p>Test body</p>", status: "published",
      user_id: @user.id,
      category_id: @category.id)
  end

  def test_create_action_should_enqueue_job
    enqueued_jobs_count = ReportsWorker.jobs.size

    post(api_v1_articles_report_path, headers:)
    assert_response :success
    assert_equal enqueued_jobs_count + 1, ReportsWorker.jobs.size
    ReportsWorker.drain
    assert_equal enqueued_jobs_count, ReportsWorker.jobs.size
  end

  def test_download_action_response_if_no_pdf_attached
    get(download_api_v1_articles_report_path, headers:)
    assert_response :not_found
    assert_equal t("not_found", entity: "report"), response_body["error"]
  end

  def test_download_action_resopnse_if_pdf_attached
    post(api_v1_articles_report_path, headers:)
    ReportsWorker.drain

    expected_response = Base64.encode64(@user.report.download)
    get(download_api_v1_articles_report_path, headers:)
    assert_response :success
    assert_equal("application/pdf", response.header["Content-Type"])
    assert_equal(expected_response, response.body)
  end
end
