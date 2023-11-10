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
  # TODO: SEE WHY IT IS NOT QUERYING. OR BETTER WHEN IS A QUERY FIRED UP WITH ASSOCIATION METHODS
  json.category_name @article.category.name
  json.versions @article.versions
  # do |version|
  # json.id version.id
  # json.object version.object
  # end
end
