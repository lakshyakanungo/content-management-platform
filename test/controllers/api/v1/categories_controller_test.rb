# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @current_user = create(:user)
    @category = create(:category, user_id: @current_user.id)
  end

  def test_should_list_all_categories_ordered_by_position
    get(api_v1_categories_path, headers:)
    assert_response :success
    response_json = response_body
    all_categories = response_json["categories"]

    expected_categories_ids = @current_user.categories.order(:position).pluck(:id)

    actual_categories_ids = all_categories.pluck("id")

    assert_equal expected_categories_ids, actual_categories_ids
  end

  def test_search_results_should_list_categories
    query = "a"

    get(search_api_v1_categories_path(name: query), headers:)
    assert_response :success
    response_json = response_body

    search_categories = response_json["categories"]

    expected_search_results = @current_user.categories.where("lower(name) LIKE ?", "%#{query}%").pluck(:id).sort

    actual_search_results = search_categories.pluck("id").sort

    assert_equal expected_search_results, actual_search_results
  end

  def test_should_create_valid_category
    post(
      api_v1_categories_path,
      params: { category: { name: "New category", user_id: @current_user.id } },
      headers:)
    assert_response :success
  end

  def test_should_update_category_fields
    new_name = "#{@category.name}-(updated)"
    category_params = { category: { name: new_name } }

    put(api_v1_category_path(@category.id), params: category_params, headers:)
    assert_response :success
    @category.reload
    assert_equal new_name, @category.name
  end

  def test_should_update_position_after_reordering
    test_category = create(:category, user_id: @current_user.id)
    current_position = test_category.position

    new_position = 1
    category_params = { category: { position: new_position } }
    put(api_v1_category_path(test_category.id), params: category_params, headers:)

    assert_response :success
    test_category.reload
    assert_equal test_category.position, new_position
  end

  def test_should_destroy_category
    new_category = create(:category, user_id: @current_user.id)
    assert_difference "Category.count", -1 do
      delete(
        api_v1_category_path(id: @category.id, params: { category: { move_into_category_id: new_category.id } }),
        headers:)
    end

    assert_response :success
  end
end
