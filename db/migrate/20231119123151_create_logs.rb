# frozen_string_literal: true

class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs, id: :uuid do |t|
      t.integer :article_id
      t.text :message
      t.timestamps
    end
  end
end
