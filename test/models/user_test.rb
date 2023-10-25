# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      name: "Sam Smith",
      email: "sam@example.com",
                     )
  end

  # embed new test cases here...
  def test_user_should_not_be_valid_and_saved_without_name
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_be_of_valid_length
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert @user.invalid?
  end
end
