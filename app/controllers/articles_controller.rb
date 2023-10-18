# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_multiple_articles!, only: %i[destroy_multiple update_multiple]

  # def index
  #   articles = Article.all
  #   render status: :ok, json: { articles: }
  #   # render json: @articles
  #   # render
  # end
  def index
    @all_articles = Article.all.joins(:category).select(
      "articles.id as id", "title", "author", "body", "status", "last_published_at", "categories.id as category_id",
      "categories.name as category_name")
    @draft_articles = @all_articles.filter { |article| article.status == "Draft" }
    @published_articles = @all_articles.filter { |article|article.status == "Published" }
    # render status: :ok, json: { articles: @articles_list }
    # # render
  end

  def search
    puts "Parmassss", params
    query = params[:title].downcase
    # query = "*" if query == ""
    category_ids = params[:category_id]

    if category_ids.nil?
      @search_results = Article.joins(:category).select(
        "articles.id as id", "title", "author", "body", "status", "last_published_at", "categories.id as category_id",
        "categories.name as category_name").where("lower(title) LIKE ?", "%#{query}%")
    else
      @search_results = Article.joins(:category).select(
        "articles.id as id", "title", "author", "body", "status", "last_published_at", "categories.id as category_id",
        "categories.name as category_name").where("lower(title) LIKE ?", "%#{query}%").where(
          "category_id = ?",
          category_ids)
    end

    # puts "results : ", @search_results
    render status: :ok, json: { articles: @search_results }
  end

  def create
    current_user.articles.create!(article_params)
  end

  def update
    # puts "Printing", article_params
    # TODO: See if to allow all permitted article params here or we can filter those also here
    @article.update!(article_params)
  end

  def destroy
    @article.destroy!
  end

  def destroy_multiple
    @articles.destroy_all
  end

  def update_multiple
    # puts "updating multiple...", article_params
    @articles.update!(article_params)
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, :title, :body)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_multiple_articles!
      # puts "params", params
      @articles = current_user.articles.where(id: params[:ids])
      # puts "checking", @articles
    end
end
