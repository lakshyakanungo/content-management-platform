# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category,
    :id,
    :name,
    :created_at,
    :updated_at,
    :user_id,
    :position
  json.articles_count category.articles_count
end
