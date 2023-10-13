# frozen_string_literal: true

class AddCategoryIdToArticle < ActiveRecord::Migration[7.0]
  def change
    add_reference :articles, :category, type: :uuid, foreign_key: true
  end
end
