# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = Category.create!(name: "Test category", user_id: @user.id)
  end

  def test_values_of_created_at_and_updated_at
    category = Category.new(name: "This is a test category", user_id: @user.id,)
    assert_nil category.created_at
    assert_nil category.updated_at

    category.save!
    assert_not_nil category.created_at
    assert_equal category.updated_at, category.created_at

    category.update!(name: "This is an updated category")
    assert_not_equal category.updated_at, category.created_at
  end

  def test_category_should_not_be_valid_without_user
    @category.user_id = nil
    assert_not @category.save
    assert_includes @category.errors.full_messages, "User must exist"
  end

  def test_category_name_should_not_exceed_maximum_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_validation_should_accept_valid_names
    valid_names = %w[name name_1 name! -name- _name_ /name 1]

    valid_names.each do |name|
      @category.name = name
      assert @category.valid?
    end
  end

  def test_validation_should_reject_invalid_name
    invalid_names = %w[/ *** __ ~ ...]

    invalid_names.each do |name|
      @category.name = name
      assert @category.invalid?
    end
  end

  def test_category_count_increases_on_saving
    assert_difference ["Category.count"] do
      Category.create!(name: "New", user_id: @user.id)
    end
  end

  def test_category_count_decreases_on_deleting
    assert_difference ["Category.count"], -1 do
      @category.delete
    end
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
  end

  def test_duplicate_name_should_not_be_allowed
    another_test_category = Category.create!(name: "Another name", user_id: @user.id)

    assert_raises ActiveRecord::RecordInvalid do
      another_test_category.update!(name: @category.name)
    end
  end

  def test_new_category_should_be_inserted_at_last_position
    current_count = Category.count
    new_category = Category.create!(name: "New category", user_id: @user.id)

    assert_equal new_category.position, current_count + 1
  end
end
