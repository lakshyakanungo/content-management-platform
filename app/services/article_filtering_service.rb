# frozen_string_literal: true

class ArticleFilteringService
  attr_reader :current_user, :params

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  def process
    articles = current_user.articles
    articles = filter_by_status(articles)
    articles = filter_by_category(articles)
    articles = filter_by_search(articles)
    articles.includes(:category).order(updated_at: :desc)
  end

  private

    def filter_by_status(articles)
      articles.by_status(params[:status])
    end

    def filter_by_category(articles)
      articles.by_categories(params[:category_id])
    end

    def filter_by_search(articles)
      query = params[:title].to_s.downcase
      articles.where("lower(title) LIKE ?", "%#{query}%")
    end
end
