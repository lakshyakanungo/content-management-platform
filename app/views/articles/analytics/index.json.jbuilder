# frozen_string_literal: true

json.articles @articles do |article|
  json.partial!("articles/article", article:)
  json.extract! article,
    :visits,
    :slug
end
json.total_count @articles.total_count
