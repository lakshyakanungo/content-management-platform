# frozen_string_literal: true

class AddNotNullConstraintToSiteSettings < ActiveRecord::Migration[7.0]
  def change
    change_column_null :site_settings, :title, false
  end
end
