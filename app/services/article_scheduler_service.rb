# frozen_string_literal: true

class ArticleSchedulerService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process(article_params)
    job = ArticleUpdaterJob
      .set(wait_until: Time.parse(article_params[:scheduled_time]).to_f)
      .perform_later(article, article_params.except(:scheduled_time))

    puts "JOB SCHEDULED ID: ", job.provider_job_id
    puts "type", job.provider_job_id.class
    puts "JOB SCHEDULED : ", job.inspect

    article.create_schedule!(time: DateTime.parse(article_params[:scheduled_time]), job_id: job.provider_job_id)
  end
end
