# frozen_string_literal: true

json.categories @search_results do |category|
  json.partial!("api/v1/categories/category", category:)
end
