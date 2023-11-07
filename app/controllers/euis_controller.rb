# frozen_string_literal: true

class EuisController < ApplicationController
  include Authenticable

  def index
    @grouped_articles = current_user.articles.published
      .includes(:category)
      .order("categories.position")
      .select(:id, :title, :slug, :category_id)
      .group_by { |article| article.category.name }.to_a
  end

  def show
    @article = current_user.articles.find_by(slug: params[:slug])
  end
end
