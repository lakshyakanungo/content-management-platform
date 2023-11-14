# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy restore_version]
  before_action :load_multiple_articles, only: %i[bulk_destroy bulk_update]
  before_action :reset_article_visits, only: %i[update bulk_update]

  def index
    @draft_articles_count = current_user.articles.draft.count
    @published_articles_count = current_user.articles.published.count
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
      .page(params[:page])
      .per(9)
  end

  def show
    render
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    updated_article_params = reset_article_visits
    @article.update!(updated_article_params)
    respond_with_success(t("successfully_updated", entity: "Article", count: 1))
  end

  def restore_version
    version = @article.versions.find(article_params[:version_id])
    @article = version.reify
    @article.status = "draft"
    @article.paper_trail_event = "restore"
    @article.save!
    # TODO: translation here
    respond_with_success("Article version restored")
  end

  def analytics
    sort_order = params[:order_by] == "ascend" ? "asc" : "desc"
    @articles = current_user.articles.published
      .includes(:category)
      .order(visits: sort_order)
      .page(params[:page])
      .per(10)
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article", count: 1))
  end

  def bulk_destroy
    @articles.destroy_all
    respond_with_success(t("successfully_deleted", entity: "Articles", count: 2))
  end

  def bulk_update
    updated_article_params = reset_article_visits
    @articles.update!(updated_article_params)
    respond_with_success(t("successfully_updated", entity: "Articles", count: 2))
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, :title, :body, :version_id)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_multiple_articles
      @articles = current_user.articles.where(id: params[:ids])
    end

    def reset_article_visits
      if article_params[:status] == "draft"
        article_params.merge({ visits: 0 })
      else
        article_params
      end
    end
end
