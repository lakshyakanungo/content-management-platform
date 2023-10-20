# frozen_string_literal: true

class AddTitleToSiteSettings < ActiveRecord::Migration[7.0]
  def change
    add_column :site_settings, :title, :string
  end
end
