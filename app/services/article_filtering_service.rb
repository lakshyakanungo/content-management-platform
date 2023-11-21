# frozen_string_literal: true

class ArticleFilteringService
  def process(current_user, params)
    query = params[:title].downcase

    current_user.articles
      .by_status(params[:status])
      .by_categories(params[:category_id])
      .where("lower(title) LIKE ?", "%#{query}%")
      .includes(:category)
      .order(updated_at: :desc)
  end
end
