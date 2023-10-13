# frozen_string_literal: true

class AddNullToStatus < ActiveRecord::Migration[7.0]
  def change
    change_column_null :articles, :status, false
  end
end
