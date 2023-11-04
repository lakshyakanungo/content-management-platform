# frozen_string_literal: true

class ChangeColumnDefaultForStatus < ActiveRecord::Migration[7.0]
  def change
    change_column_default :articles, :status, :draft
  end
end
