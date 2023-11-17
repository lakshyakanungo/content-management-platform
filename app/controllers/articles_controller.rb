# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy restore_version]
  before_action :load_multiple_articles, only: %i[bulk_destroy bulk_update]

  def index
    @draft_articles_count = current_user.articles.draft.count
    @published_articles_count = current_user.articles.published.count
  end

  def search
    query = params[:title].downcase

    @search_results = current_user.articles
      .by_status(params[:status])
      .by_categories(params[:category_id])
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
    updated_article_params = merge_visits_in_params_for_draft
    @article.update!(updated_article_params)
    respond_with_success(t("successfully_updated", entity: "Article", count: 1))
  end

  def restore_version
    version = @article.versions.find(article_params[:version_id]).reify
    # puts version.inspect, "version"
    @article.update!(
      version.attributes.slice("title", "body", "category_id").merge(
        {
          status: "draft",
          paper_trail_event: "restore"
        }))
    respond_with_success(t("article.restored"))
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
    updated_article_params = merge_visits_in_params_for_draft
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

    def merge_visits_in_params_for_draft
      if article_params[:status] == "draft"
        article_params.merge({ visits: 0 })
      else
        article_params
      end
    end
end
