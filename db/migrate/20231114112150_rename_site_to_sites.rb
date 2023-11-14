# frozen_string_literal: true

class RenameSiteToSites < ActiveRecord::Migration[7.0]
  def change
    rename_table :site, :sites
  end
end
