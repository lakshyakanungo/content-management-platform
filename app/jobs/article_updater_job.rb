# frozen_string_literal: true

class ArticleUpdaterJob < ApplicationJob
  # include ApiResponders
  sidekiq_options queue: :default, retry: 3
  queue_as :default

  def perform(article, article_params)
    article.update!(article_params)
    remove_job_from_schedule_table article
    # respond_with_success("Article #{article.title} has been updated!")
  end

  def remove_job_from_schedule_table(article)
    article.schedule.delete
  end
end
