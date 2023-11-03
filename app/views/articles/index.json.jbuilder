# frozen_string_literal: true

json.counts do
  json.all @draft_articles_count + @published_articles_count
  json.draft @draft_articles_count
  json.published @published_articles_count
end
