# frozen_string_literal: true

class ArticleSchedulerService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process(article_params)
    job = ArticleUpdaterJob
      .set(wait_until: DateTime.parse(article_params[:scheduled_time]))
      .perform_later(article, article_params.except(:scheduled_time))

    article.create_schedule!(
      time: DateTime.parse(article_params[:scheduled_time]),
      job_id: job.provider_job_id || job.job_id)
  end
end
