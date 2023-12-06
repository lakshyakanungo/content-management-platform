# frozen_string_literal: true

json.articles @articles do |article|
  json.partial!("api/v1/articles/article", article:)
  json.extract! article,
    :visits,
    :slug
end
json.total_count @articles.total_count
