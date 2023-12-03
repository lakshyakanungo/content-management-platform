# frozen_string_literal: true

class ArticleSchedulingWorker
  include Sidekiq::Worker

  def perform(article_id, params)
    article = Article.find(article_id)
    article.update!(params)
    article.schedule.delete
  end
end
