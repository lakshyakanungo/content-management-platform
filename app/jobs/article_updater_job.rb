# frozen_string_literal: true

class ArticleUpdaterJob < ApplicationJob
  queue_as :default

  def perform(article, article_params)
    # Do something later
    # puts "Article will get updated"
    article.update!(article_params)
    # puts "Article has been updated"
  end
end
