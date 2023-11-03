# frozen_string_literal: true

class MakeSlugNotNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :articles, :slug, false
  end
end
