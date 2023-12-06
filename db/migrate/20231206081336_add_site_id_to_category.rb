# frozen_string_literal: true

class AddSiteIdToCategory < ActiveRecord::Migration[7.0]
  def change
    add_reference :categories, :site, type: :uuid, foreign_key: true
  end
end
