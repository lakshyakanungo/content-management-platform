# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = Site.create!(title: "Test title", is_password_protected: true, password: "abcdefg1")
    @redirection = @site.redirections.create!(from: "/test", to: "https://spinkart.scribbl.com")
  end

  def test_should_list_all_redirections
    get(redirections_path, headers:)
    assert_response :success
    response_json = response_body
    all_redirections = response_json["redirections"]

    expected_redirections_ids = @site.redirections.order(:created_at).pluck(:id)

    actual_redirections_ids = all_redirections.pluck("id")

    assert_equal expected_redirections_ids, actual_redirections_ids
  end

  def test_should_create_valid_redirection
    post(
      redirections_path,
      params: { redirection: { from: "/abc", to: "https://google.com" } },
      headers:)
    assert_response :success
  end

  def test_should_update_redirection_fields
    new_from_path = "/updated"
    redirection_params = { redirection: { from: new_from_path } }

    put(redirection_path(@redirection.id), params: redirection_params, headers:)
    assert_response :success
    @redirection.reload
    assert_equal new_from_path, @redirection.from
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete(redirection_path(@redirection.id), headers:)
    end

    assert_response :success
  end
end
