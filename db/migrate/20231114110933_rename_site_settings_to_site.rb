# frozen_string_literal: true

class RenameSiteSettingsToSite < ActiveRecord::Migration[7.0]
  def change
    rename_table :site_settings, :site
  end
end
