# frozen_string_literal: true

json.article do
  json.partial! "articles/article", article: @article
  json.extract! @article,
    :status,
    :category_id,
    :body
  json.versions @article.versions
  json.schedule @article.schedule
end
