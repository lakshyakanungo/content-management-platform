# frozen_string_literal: true

class AddStatusToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :status, :string, default: "Draft"
  end
end
