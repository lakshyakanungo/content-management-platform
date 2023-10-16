# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[7.0]
  def change
    create_table :redirections, id: :uuid do |t|
      t.string :from, null: false
      t.string :to, null: false
      t.timestamps
    end
  end
end
