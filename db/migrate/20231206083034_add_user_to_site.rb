# frozen_string_literal: true

class AddUserToSite < ActiveRecord::Migration[7.0]
  def change
    add_reference :sites, :user, type: :uuid, foreign_key: true
  end
end
