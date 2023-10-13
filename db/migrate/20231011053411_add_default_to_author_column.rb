# frozen_string_literal: true

class AddDefaultToAuthorColumn < ActiveRecord::Migration[7.0]
  def change
    change_column_default :articles, :author, "Oliver"
  end
end
