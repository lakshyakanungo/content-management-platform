# frozen_string_literal: true

class ArticleSchedulerService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process(article_params)
    article.create_schedule!(time: DateTime.parse(article_params[:scheduled_time]))
    value_returned = ArticleUpdaterJob
      .set(wait_until: Time.parse(article_params[:scheduled_time]).to_f)
      .perform_later(article, article_params.except(:scheduled_time))
    puts "JOB SCHEDULED ID: ", value_returned.job_id
    puts "JOB SCHEDULED : ", value_returned.inspect
  end
end
