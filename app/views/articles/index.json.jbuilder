# frozen_string_literal: true

# json.articles do
#   json.id @articles_list.id
#   json.title @articles_list.title
#   json.author @articles_list.author
#   json.body @articles_list.body
#   json.status @articles_list.status
#   json.last_published_at @articles_list.last_published_at
#   json.category @articles_list.category

#   json.assigned_user do
#     json.id @articles_list.assigned_user.id
#     json.name @articles_list.assigned_user.name
#   end
# end

json.articles do
  json.draft @draft_articles
  json.published @published_articles
end
