# frozen_string_literal: true

class RemoveTimeFromSchedule < ActiveRecord::Migration[7.0]
  def change
    remove_column :schedules, :time
  end
end
