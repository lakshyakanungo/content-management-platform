# frozen_string_literal: true

class EuisController < ApplicationController
  include Authenticable
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def index
    @grouped_articles = current_user.articles.includes(:category)
      .order("categories.position")
      .where(status: "Published")
      .select(:id, :title, :slug, :category_id)
      .group_by { |article| article.category.name }.to_a
  end

  # def grouped_by_category
  #   @grouped_articles = Article.joins(:category)
  #     .order("categories.position")
  #     .where(status: "Published")
  #     .group_by { |article| article.category.name }.to_a
  # end

  def show
    @article = current_user.articles.find_by(slug: params[:slug])
  end
end
