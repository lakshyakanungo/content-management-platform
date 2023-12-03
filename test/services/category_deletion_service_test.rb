# frozen_string_literal: true

require "test_helper"

class CategoryDeletionServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
  end

  def test_process_when_more_than_one_category
    final_category = Category.create!(name: "Final category", user_id: @user.id)

    initial_category_count = Category.count
    CategoryDeletionService.new(@category.id, @user).process(final_category.id)

    assert_equal Category.count, initial_category_count - 1
  end

  def test_process_when_only_one_category
    CategoryDeletionService.new(@category.id, @user).process(nil)
    assert_equal Category.count, 1
    assert_equal Category.first.name, Category::DEFAULT_CATEGORY_NAME
  end
end
