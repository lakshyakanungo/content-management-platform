# frozen_string_literal: true

require "test_helper"

class SiteSettingTest < ActiveSupport::TestCase
  def setup
    @site_setting = create(:site_setting)
  end

  def test_values_of_created_at_and_updated_at
    site_setting = SiteSetting.new(
      title: "Test title")
    assert_nil site_setting.created_at
    assert_nil site_setting.updated_at

    site_setting.save!
    assert_not_nil site_setting.created_at
    assert_equal site_setting.updated_at, site_setting.created_at

    site_setting.update!(title: "This is an updated site_setting")
    assert_not_equal site_setting.updated_at, site_setting.created_at
  end

  def test_site_settings_title_should_not_exceed_maximum_length
    @site_setting.title = "a" * (SiteSetting::MAX_TITLE_LENGTH + 1)
    assert_not @site_setting.valid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[title title_1 title! -title- _title_ /title 1]

    valid_titles.each do |title|
      @site_setting.title = title
      assert @site_setting.valid?
    end
  end

  def test_validation_should_reject_invalid_title
    invalid_titles = %w[/ *** __ ~ ...]

    invalid_titles.each do |title|
      @site_setting.title = title
      assert @site_setting.invalid?
    end
  end
end
