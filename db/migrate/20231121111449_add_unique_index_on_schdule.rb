# frozen_string_literal: true

class AddUniqueIndexOnSchdule < ActiveRecord::Migration[7.0]
  def change
    add_index :schedules, :article_id, unique: true
  end
end
