# frozen_string_literal: true

class AddUserIdToArticles < ActiveRecord::Migration[7.0]
  def change
    add_reference :articles, :user, type: :uuid, foreign_key: true
  end
end
