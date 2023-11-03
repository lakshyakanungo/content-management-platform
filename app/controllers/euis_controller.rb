# frozen_string_literal: true

class EuisController < ApplicationController
  include Authenticable
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def show
    # puts "reahcing here"
    @setting = SiteSetting.first
    # puts @setting.inspect, "GOT THIS"
  end

  def grouped_by_category
    @grouped_articles = Article.joins(:category)
      .order("categories.position")
      .where(status: "Published")
      .group_by { |article| article.category.name }.to_a
  end

  def show_article
    # puts "COMING HERE BABY!"
    @article = current_user.articles.find_by(slug: params[:slug])
  end
end
