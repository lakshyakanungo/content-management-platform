# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_should_redirect_successfully
    Redirection.create!(from: "/1", to: "/2")
    get "/1"
    assert_response :moved_permanently
  end
end
