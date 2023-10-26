# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update destroy]
  before_action :load_multiple_articles!, only: %i[destroy_multiple update_multiple]

  def index
    @all_articles = Article.all.order(updated_at: :desc)
    @draft_articles = @all_articles.filter { |article| article.status == "Draft" }
    @published_articles = @all_articles.filter { |article|article.status == "Published" }
  end

  def grouped_by_category
    @grouped_articles = Article.joins(:category).group_by { |article| article.category.name }.to_a
  end

  def search
    query = params[:title].downcase
    category_ids = params[:category_id]
    status = params[:status]

    @search_results = current_user.articles
      .by_status(status)
      .by_categories(category_ids)
      .where("lower(title) LIKE ?", "%#{query}%")
      .includes(:category)
      .order(updated_at: :desc)
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success("Created new article")
  end

  def update
    @article.update!(article_params)
    respond_with_success("Updated successfully")
  end

  def destroy
    @article.destroy!
    respond_with_success("Deleted successfully")
  end

  def destroy_multiple
    @articles.destroy_all
    respond_with_success("Deleted successfully")
  end

  def update_multiple
    @articles.update!(article_params)
    respond_with_success("Updated successfully")
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, :title, :body)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_multiple_articles!
      @articles = current_user.articles.where(id: params[:ids])
    end
end
