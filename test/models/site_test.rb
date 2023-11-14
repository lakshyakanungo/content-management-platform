# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
  end

  def test_site_title_should_not_exceed_maximum_length
    @site.title = "a" * (Site::MAX_TITLE_LENGTH + 1)
    assert_not @site.valid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[title title_1 title! -title- _title_ /title 1]

    valid_titles.each do |title|
      @site.title = title
      assert @site.valid?
    end
  end

  def test_validation_should_reject_invalid_title
    invalid_titles = %w[/ *** __ ~ ...]

    invalid_titles.each do |title|
      @site.title = title
      assert @site.invalid?
    end
  end

  def test_should_reject_invalid_passwords
    invalid_passwords = %w[123 1234567 abc abcdefg ------]
    invalid_passwords.each do |invalid_password|
      @site.password = invalid_password
      assert @site.invalid?
    end
  end
end
