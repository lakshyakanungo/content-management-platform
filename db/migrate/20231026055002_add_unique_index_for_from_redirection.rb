# frozen_string_literal: true

class AddUniqueIndexForFromRedirection < ActiveRecord::Migration[7.0]
  def change
    add_index :redirections, :from, unique: true
  end
end
