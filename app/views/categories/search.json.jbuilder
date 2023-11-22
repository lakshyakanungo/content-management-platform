# frozen_string_literal: true

json.categories @search_results do |category|
  json.partial!("categories/category", category:)
end
