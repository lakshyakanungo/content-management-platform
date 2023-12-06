# frozen_string_literal: true

json.articles @search_results do |article|
  json.id article.id
  json.slug article.slug
  json.title article.title
  json.body Nokogiri::HTML.parse(article.body).text
end
