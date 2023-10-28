# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @redirection = create(:redirection)
  end

  def test_values_of_created_at_and_updated_at
    redirection = Redirection.new(user_id: @user.id, from: "/abc", to: @redirection.to)
    assert_nil redirection.created_at
    assert_nil redirection.updated_at

    redirection.save!
    assert_not_nil redirection.created_at
    assert_equal redirection.updated_at, redirection.created_at

    redirection.update!(from: "/another_test_path")
    assert_not_equal redirection.updated_at, redirection.created_at
  end

  # def test_validation_should_reject_invalid_from_path_urls
  #   invalid_from_paths = %w[a /- /*d /? /a?b=]
  #   invalid_from_paths.each do |path|
  #     @redirection.from = path
  #     assert @redirection.invalid?
  #   end
  # end

  def test_validation_should_accept_valid_from_path_urls
    valid_from_paths = %w[/a /abc /ab/c/d/e ]
    valid_from_paths.each do |path|
      @redirection.from = path
      assert @redirection.valid?
    end
  end

  def test_validation_should_reject_invalid_to_path_urls
    invalid_to_paths = %w[/a http//ab https:// https://google. https://google.co. https://g-$a]
    invalid_to_paths.each do |path|
      @redirection.to = path
      assert @redirection.invalid?
    end
  end

  def test_validation_should_accept_valid_to_path_urls
    valid_to_paths = %w[https://google.com https://google.co.in https://google.co.in/ab/c https://www.google.com]
    valid_to_paths.each do |path|
      @redirection.to = path
      assert @redirection.valid?
    end
  end
end
