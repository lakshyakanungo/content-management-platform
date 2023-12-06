# frozen_string_literal: true

require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = Site.create!(title: "Test title", is_password_protected: true, password: "welcome1")
  end

  def test_should_authenticate_valid_password
    post api_v1_session_path, params: { session: { password: @site.password } }, as: :json
    assert_response :success
    assert_equal response_body["authentication_token"], @site.authentication_token
  end

  def test_shouldnt_authenticate_invalid_password
    post api_v1_session_path, params: { session: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    assert_equal t("invalid_password"), response_body["error"]
  end
end
