# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category)
  end

  def test_should_list_all_categories_ordered_by_position
    get(categories_path, headers:)
    assert_response :success
    response_json = response_body
    all_categories = response_json["categories"]

    expected_categories_ids = Category.order(:position).pluck(:id)

    actual_categories_ids = all_categories.pluck("id")

    assert_equal expected_categories_ids, actual_categories_ids
  end

  def test_search_results_should_list_categories
    query = "a"

    get(search_categories_path(name: query), headers:)
    assert_response :success
    response_json = response_body

    search_categories = response_json["categories"]

    expected_search_results = Category.where("lower(name) LIKE ?", "%#{query}%").pluck(:id).sort

    actual_search_results = search_categories.pluck("id").sort

    assert_equal expected_search_results, actual_search_results
  end

  def test_should_create_valid_category
    post(
      categories_path,
      params: { category: { name: "Test category", user_id: @user.id } },
      headers:)
    assert_response :success
  end

  def test_shouldnt_create_category_without_name
    post(
      categories_path, params: { category: { name: "", user_id: @user.id } },
      headers:)
    assert_response :unprocessable_entity
    response_json = response_body
    assert_equal "Name can't be blank and Name is invalid", response_json["error"]
  end

  def test_should_update_category_fields
    new_name = "#{@category.name}-(updated)"
    category_params = { category: { name: new_name, user_id: @user.id } }

    put(category_path(@category.id), params: category_params, headers:)
    assert_response :success
    @category.reload
    assert_equal new_name, @category.name
  end

  # def test_should_destroy_category
  #   new_category = create(:category)
  #   assert_difference "Category.count", -1 do
  #     delete(category_path(@category.id, move_into_category_id: new_category.id), headers:)
  #   end
  #   assert_response :ok
  # end
end
