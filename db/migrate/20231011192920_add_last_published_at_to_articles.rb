# frozen_string_literal: true

class AddLastPublishedAtToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :last_published_at, :datetime
  end
end
