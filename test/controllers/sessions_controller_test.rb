# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site_setting = SiteSetting.create!(title: "Test title", is_password_protected: true, password: "welcome1")
  end

  def test_should_authenticate_valid_password
    post session_path, params: { session: { password: @site_setting.password } }, as: :json
    assert_response :success
    assert_equal response_body["authentication_token"], @site_setting.authentication_token
  end

  def test_shouldnt_authenticate_invalid_password
    post session_path, params: { session: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    assert_equal t("invalid_password"), response_body["error"]
  end
end
