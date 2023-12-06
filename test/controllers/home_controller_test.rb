# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_should_redirect_successfully
    @site.redirections.create!(from: "/1", to: "/2")
    get "/1"
    assert_response :moved_permanently
  end
end
