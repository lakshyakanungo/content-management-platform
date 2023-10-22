# frozen_string_literal: true

json.articles do
  json.draft @draft_articles do |draft|
      json.extract! draft,
        :author,
        :body,
        :category_id,
        :category_name,
        :id,
        :last_published_at,
        :status,
        :title
    end

  json.published @published_articles do |published|
    json.extract! published,
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
