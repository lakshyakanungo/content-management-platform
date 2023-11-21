# frozen_string_literal: true

class AddArticleToSchedule < ActiveRecord::Migration[7.0]
  def change
    add_reference :schedules, :article, type: :uuid, null: false, foreign_key: true
  end
end
