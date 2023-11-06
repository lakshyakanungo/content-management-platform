# frozen_string_literal: true

class RemoveColumnUserIdFromRedirections < ActiveRecord::Migration[7.0]
  def change
    remove_column :redirections, :user_id
  end
end
