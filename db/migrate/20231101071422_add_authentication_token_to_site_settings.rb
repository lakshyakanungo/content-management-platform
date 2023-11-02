# frozen_string_literal: true

class AddAuthenticationTokenToSiteSettings < ActiveRecord::Migration[7.0]
  def change
    add_column :site_settings, :authentication_token, :string
  end
end
