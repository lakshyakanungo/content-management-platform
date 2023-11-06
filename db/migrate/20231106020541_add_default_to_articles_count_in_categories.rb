# frozen_string_literal: true

class AddDefaultToArticlesCountInCategories < ActiveRecord::Migration[7.0]
  def change
    change_column_default :categories, :articles_count, from: nil, to: 0
  end
end
