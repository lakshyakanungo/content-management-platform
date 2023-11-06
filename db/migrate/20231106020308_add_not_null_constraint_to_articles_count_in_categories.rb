# frozen_string_literal: true

class AddNotNullConstraintToArticlesCountInCategories < ActiveRecord::Migration[7.0]
  def change
    change_column_null :categories, :articles_count, false
  end
end
