# frozen_string_literal: true

json.articles @search_results do |article|
  json.extract! article,
    :author,
    :category_id,
    :id,
    :last_published_at,
    :status,
    :title
  json.category_name article.category.name
end
