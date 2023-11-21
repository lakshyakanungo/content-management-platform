# frozen_string_literal: true

class ArticleUpdaterJob < ApplicationJob
  sidekiq_options queue: :default, retry: 3
  queue_as :default

  def perform(article, article_params)
    article.update!(article_params)
  end
end
