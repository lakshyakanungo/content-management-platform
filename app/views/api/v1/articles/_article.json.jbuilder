# frozen_string_literal: true

json.extract! article,
  :author,
  :id,
  :last_published_at,
  :title
json.category_name article.category.name
