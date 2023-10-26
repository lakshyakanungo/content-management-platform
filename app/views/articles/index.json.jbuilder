# frozen_string_literal: true

json.articles do
  json.all @all_articles do |article|
    json.extract! article,
      :author,
      :body,
      :category_id,
      :id,
      :last_published_at,
      :status,
      :title
    json.category_name article.category.name
  end
  json.draft @draft_articles do |article|
      json.extract! article,
        :author,
        :body,
        :category_id,
        :id,
        :last_published_at,
        :status,
        :title
      json.category_name article.category.name
    end

  json.published @published_articles do |article|
    json.extract! article,
      :author,
      :body,
      :category_id,
      :id,
      :last_published_at,
      :status,
      :title
    json.category_name article.category.name
  end
end
