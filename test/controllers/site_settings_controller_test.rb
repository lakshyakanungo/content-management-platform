# frozen_string_literal: true

require "test_helper"

class SiteSettingsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site_setting = SiteSetting.create!(title: "Test title", is_password_protected: true, password: "abcdefg1")
  end

  def test_should_respond_with_site_setting
    get(site_settings_path, headers:)
    assert_response :success

    response_json = response_body
    expected_title = response_body["title"]
    expected_is_password_protected = response_body["is_password_protected"]

    actual_title = SiteSetting.first.title
    actual_is_password_protected = SiteSetting.first.is_password_protected

    assert_equal expected_title, actual_title
    assert_equal expected_is_password_protected, actual_is_password_protected
  end

  def test_should_update_site_setting
    new_title = "Test title updated"
    site_settings_params = { site_settings: { title: new_title, is_password_protected: true } }

    put(site_settings_path, params: site_settings_params, headers:)
    assert_response :success
    @site_setting.reload
    assert_equal @site_setting.title, new_title
    assert_equal true, @site_setting.is_password_protected
  end

  def test_should_regenerate_authentication_token_after_successfull_password_update
    current_authentication_tokn = @site_setting.authentication_token
    site_settings_params = { site_settings: { title: "New", password: "welcome1" } }

    put(site_settings_path, params: site_settings_params, headers:)
    assert_response :success

    @site_setting.reload
    assert_not_equal @site_setting.authentication_token, current_authentication_tokn
  end
end
