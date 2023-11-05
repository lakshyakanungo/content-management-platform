# frozen_string_literal: true

class EuisController < ApplicationController
  include Authenticable

  def index
    @grouped_articles = current_user.articles.published
      .includes(:category)
      .order("categories.position")
      # .where(status: "published")
      .select(:id, :title, :slug, :category_id)
      .group_by { |article| article.category.name }.to_a
  end

  # def grouped_by_category
  #   @grouped_articles = Article.joins(:category)
  #     .order("categories.position")
  #     .where(status: "published")
  #     .group_by { |article| article.category.name }.to_a
  # end

  def show
    @article = current_user.articles.find_by(slug: params[:slug])
  end
end
