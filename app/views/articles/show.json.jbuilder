# frozen_string_literal: true

json.article do
  json.extract! @article,
    :author,
    :body,
    :category_id,
    :id,
    :last_published_at,
    :status,
    :title
  json.category_name @article.category.name
  json.versions @article.versions
end
