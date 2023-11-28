# frozen_string_literal: true

class Public::ArticlesController < ApplicationController
  include Authenticable

  after_action :increase_article_visits!, only: :show

  def index
    articles = current_user.articles.published
      .includes(:category)
      .order("categories.position")
    @articles_carrier = Public::ArticlesCarrier.new articles
  end

  def show
    @article = current_user.articles.published.find_by!(slug: params[:slug])
  end

  def search
    search_term = params[:search_term].downcase

    @search_results = current_user.articles.published
      .where("lower(title) LIKE :search_term OR lower(body) LIKE :search_term", search_term: "%#{search_term}%")
  end

  private

  def increase_article_visits!
    @article.update!(visits: @article.visits + 1)
  end
end
