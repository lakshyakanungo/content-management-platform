# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_multiple_articles, only: %i[destroy_multiple update_multiple]

  # TODO: See if index action right for performing this count operation
  def index
    @draft_articles_count = current_user.articles.draft.count
    @published_articles_count = current_user.articles.published.count
  end

  def show
    @show_article = current_user.articles.find(params[:slug])
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

  def show
    render
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article", count: 1))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article", count: 1))
  end

  def destroy_multiple
    @articles.destroy_all
    respond_with_success(t("successfully_deleted", entity: "Articles", count: 2))
  end

  def update_multiple
    @articles.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Articles", count: 2))
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, :title, :body)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_multiple_articles
      @articles = current_user.articles.where(id: params[:ids])
    end
end
