# frozen_string_literal: true

json.articles @filtered_articles_by_page do |article|
  json.partial!("api/v1/articles/article", article:)
  json.extract! article,
    :category_id,
    :status
end
json.totalCount @filtered_articles_by_page.total_count
