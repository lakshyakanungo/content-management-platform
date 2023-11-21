# frozen_string_literal: true

class CreateSchedule < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules, id: :uuid do |t|
      t.datetime :time
      t.timestamps
    end
  end
end
