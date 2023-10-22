# frozen_string_literal: true

class AddCategoriesCountToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :categories_count, :integer
  end
end
