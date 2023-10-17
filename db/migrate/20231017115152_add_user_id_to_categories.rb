# frozen_string_literal: true

class AddUserIdToCategories < ActiveRecord::Migration[7.0]
  def change
    add_reference :categories, :user, type: :uuid, foreign_key: true
  end
end
