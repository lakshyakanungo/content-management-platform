# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article
  json.extract! @article,
    :status,
    :category_id,
    :body
  json.versions @article.versions
  json.schedule @article.schedule
end
