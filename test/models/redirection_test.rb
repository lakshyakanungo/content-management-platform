# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = Redirection.new(from: "/1", to: "/2")
  end

  def test_redirection_should_not_be_valid_and_saved_without_from_path
    @redirection.from = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From can't be blank"
  end

  def test_redirection_should_not_be_valid_and_saved_without_to_path
    @redirection.to = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To can't be blank"
  end

  def test_redirection_should_not_be_saved_if_from_path_not_unique
    @redirection.save!

    test_redirection = Redirection.new(from: "/1", to: "/test")
    assert_not test_redirection.valid?

    assert_includes test_redirection.errors.full_messages, "From has already been taken"
  end

  def test_redirection_should_not_be_saved_for_same_from_and_to_path
    test_redirection = Redirection.new(from: "/test", to: "/test")
    assert_not test_redirection.valid?

    assert_includes test_redirection.errors.full_messages, t("redirection.error.paths_equal")
  end

  def test_should_not_allow_cyclic_redirection
    test_redirection1 = Redirection.create!(from: "/1", to: "/2")
    test_redirection2 = Redirection.create!(from: "/2", to: "/3")
    test_cyclic_redirection = Redirection.new(from: "/3", to: "/1")

    assert_not test_cyclic_redirection.valid?

    assert_includes test_cyclic_redirection.errors.full_messages, t("redirection.error.cyclic")
  end

  def test_should_reject_invalid_from_path_urls
    invalid_from_paths = %w[abc a/bc. /* //]
    invalid_from_paths.each do |from_path|
        @redirection.to = from_path
        assert_not @redirection.valid?
      end
  end

  def test_validation_should_accept_valid_to_path_urls
    valid_to_paths = %w[/ /2 /abc www.google.com www.google.co.in abc.com https://abc.com/ https://abc.com/questions/regex-check-if-given-string-is-relative-url]

    valid_to_paths.each do |to_path|
      @redirection.to = to_path
      assert @redirection.valid?
    end
  end

  def test_should_reject_invalid_to_path_urls
    invalid_to_paths = %w[abc abc. https://abc. https://.s abc.c ]

    invalid_to_paths.each do |to_path|
      @redirection.to = to_path
      assert_not @redirection.valid?
    end
  end
end
