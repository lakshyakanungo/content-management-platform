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
  json.versions @article.versions do |version|
    json.id version.id
    json.object version.object
  end
end
