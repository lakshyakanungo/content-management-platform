# frozen_string_literal: true

class AddSiteToRedirections < ActiveRecord::Migration[7.0]
  def change
    add_reference :redirections, :site, type: :uuid, foreign_key: true
  end
end
