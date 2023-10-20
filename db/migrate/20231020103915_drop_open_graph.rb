# frozen_string_literal: true

class DropOpenGraph < ActiveRecord::Migration[7.0]
  def change
    drop_table :open_graphs
  end
end
