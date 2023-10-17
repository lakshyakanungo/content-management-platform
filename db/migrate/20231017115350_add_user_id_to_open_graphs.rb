# frozen_string_literal: true

class AddUserIdToOpenGraphs < ActiveRecord::Migration[7.0]
  def change
    add_reference :open_graphs, :user, type: :uuid, foreign_key: true
  end
end
