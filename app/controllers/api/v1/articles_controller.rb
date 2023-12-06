# frozen_string_literal: true

class Api::V1::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_multiple_articles, only: %i[bulk_destroy bulk_update]

  def index
    @draft_articles_count = current_user.articles.draft.count
    @published_articles_count = current_user.articles.published.count
  end

  def search
    filtered_articles = ArticleFilteringService.new(current_user, params).process
    @filtered_articles_by_page = filtered_articles.page(params[:page]).per(9)
  end

  def show
    render
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    if params_with_default_visits_for_draft[:scheduled_time].present?
      ArticleSchedulingService.new(@article, params_with_default_visits_for_draft).process
      respond_with_success(t("successfully_scheduled"))
    else
      @article.update!(params_with_default_visits_for_draft.except(:scheduled_time))
      respond_with_success(t("successfully_updated", entity: "Article", count: 1))
    end
  end

  def bulk_update
    @articles.update!(params_with_default_visits_for_draft)
    respond_with_success(t("successfully_updated", entity: "Articles", count: 2))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article", count: 1))
  end

  def bulk_destroy
    @articles.destroy_all
    respond_with_success(t("successfully_deleted", entity: "Articles", count: 2))
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, :title, :body, :scheduled_time)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_multiple_articles
      @articles = current_user.articles.where(id: params[:ids])
    end

    def params_with_default_visits_for_draft
      article_params[:status] == "draft" ? article_params.merge({ visits: 0 }) : article_params
    end
end
