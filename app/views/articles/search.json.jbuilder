# frozen_string_literal: true

json.articles @filtered_articles_by_page do |article|
  json.extract! article,
    :author,
    :category_id,
    :id,
    :last_published_at,
    :status,
    :title
  json.category_name article.category.name
end
json.totalCount @filtered_articles_by_page.total_count
