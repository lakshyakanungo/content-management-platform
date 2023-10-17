# frozen_string_literal: true

class CreateSiteSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :site_settings, id: :uuid do |t|
      t.boolean :is_password_protected, default: false, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
