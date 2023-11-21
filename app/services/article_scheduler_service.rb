# frozen_string_literal: true

class ArticleSchedulerService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process(article_params)
    article.create_schedule!(time: DateTime.parse(article_params[:scheduled_time]))
    ArticleUpdaterJob
      .set(wait_until: Time.parse(article_params[:scheduled_time]).to_f)
      .perform_later(article, article_params.except(:scheduled_time))
  end
end
