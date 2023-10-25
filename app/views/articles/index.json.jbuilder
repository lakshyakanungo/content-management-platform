# frozen_string_literal: true

json.articles do
  json.all @all_articles do |article|
    json.extract! article,
      :author,
      :body,
      :category_id,
      :category_name,
      :id,
      :last_published_at,
      :status,
      :title
  end
  json.draft @draft_articles do |article|
      json.extract! article,
        :author,
        :body,
        :category_id,
        :category_name,
        :id,
        :last_published_at,
        :status,
        :title
    end

  json.published @published_articles do |article|
    json.extract! article,
      :author,
      :body,
      :category_id,
      :category_name,
      :id,
      :last_published_at,
      :status,
      :title
  end
end
