# frozen_string_literal: true

require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @user = create(:user)
  end

  def test_connection_is_successfully_made
    connect
    assert_equal connection.current_user, @user
  end
end
