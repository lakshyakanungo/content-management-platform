# frozen_string_literal: true
# # frozen_string_literal: true

# require "test_helper"

# class RedirectionTest < ActiveSupport::TestCase
#   def setup
#     @user = create(:user)
#     @redirection = create(:redirection)
#   end

#   def test_values_of_created_at_and_updated_at
#     redirection = Redirection.new(user_id: @user.id, from: "/test_path", to: Faker::Internet.url)
#     assert_nil redirection.created_at
#     assert_nil redirection.updated_at

#     redirection.save!
#     assert_not_nil redirection.created_at
#     assert_equal redirection.updated_at, redirection.created_at

#     redirection.update!(from: "/another_test_path")
#     assert_not_equal redirection.updated_at, redirection.created_at
#   end

#   def test_validation_shoul_not_allow_invalid_values_for_from_path_url
#   end

#   def test_validation_shoul_not_allow_invalid_values_for_to_path_url
#   end
# end
