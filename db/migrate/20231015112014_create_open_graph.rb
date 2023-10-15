# frozen_string_literal: true

class CreateOpenGraph < ActiveRecord::Migration[7.0]
  def change
    create_table :open_graphs, id: :uuid do |t|
      t.string :title, null: false
      t.timestamps
    end
  end
end
