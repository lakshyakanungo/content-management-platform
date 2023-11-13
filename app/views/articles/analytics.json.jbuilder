# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :author,
    :id,
    :last_published_at,
    :title,
    :visits,
    :slug
  json.category_name article.category.name
end
json.total_count @articles.total_count
