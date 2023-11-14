# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  include Authenticable

  def index
    @grouped_articles = current_user.articles.published
      .includes(:category)
      .order("categories.position")
      .select(:id, :title, :slug, :category_id)
      .group_by { |article| article.category.name }.to_a
  end

  def show
    @article = current_user.articles.published.find_by!(slug: params[:slug])
    @article.update!(visits: @article.visits + 1) # increase visits
  end

  def search
    search_term = params[:search_term].downcase

    @search_results = current_user.articles.published
      .where("lower(title) LIKE :search_term OR lower(body) LIKE :search_term", search_term: "%#{search_term}%")
  end
end
