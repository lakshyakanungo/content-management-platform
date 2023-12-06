# frozen_string_literal: true

require "test_helper"

class Api::V1::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_should_respond_with_site
    get(api_v1_site_path, headers:)
    assert_response :success

    response_json = response_body
    expected_title = response_body["title"]
    expected_is_password_protected = response_body["is_password_protected"]

    actual_title = Site.first.title
    actual_is_password_protected = Site.first.is_password_protected

    assert_equal expected_title, actual_title
    assert_equal expected_is_password_protected, actual_is_password_protected
  end

  def test_should_update_site
    new_title = "Test title updated"
    site_params = { site: { title: new_title, is_password_protected: true } }

    put(api_v1_site_path, params: site_params, headers:)
    assert_response :success
    @site.reload
    assert_equal @site.title, new_title
    assert_equal true, @site.is_password_protected
  end

  def test_should_regenerate_authentication_token_after_successfull_password_update
    current_authentication_tokn = @site.authentication_token
    site_params = { site: { title: "New", password: "welcome1" } }

    put(api_v1_site_path, params: site_params, headers:)
    assert_response :success

    @site.reload
    assert_not_equal @site.authentication_token, current_authentication_tokn
  end
end
