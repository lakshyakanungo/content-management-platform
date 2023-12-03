# frozen_string_literal: true

class ArticleSchedulingService
  attr_reader :article, :params
  def initialize(article, params)
    @article = article
    @params = params
  end

  def process
    schedule_article
  end

  private

    def schedule_article
      article_params = params.except(:scheduled_time)
      job_id = ArticleSchedulingWorker
        .perform_at(params[:scheduled_time].to_datetime, article.id, article_params.as_json)
      article.create_schedule!(job_id:)
    end
end
