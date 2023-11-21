# frozen_string_literal: true

class RemoveIndexFromSchedule < ActiveRecord::Migration[7.0]
  def change
    remove_index :schedules, :article_id
  end
end
