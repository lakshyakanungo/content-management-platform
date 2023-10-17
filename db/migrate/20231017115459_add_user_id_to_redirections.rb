# frozen_string_literal: true

class AddUserIdToRedirections < ActiveRecord::Migration[7.0]
  def change
    add_reference :redirections, :user, type: :uuid, foreign_key: true
  end
end
