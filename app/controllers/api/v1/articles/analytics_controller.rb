# frozen_string_literal: true

class Api::V1::Articles::AnalyticsController < ApplicationController
  def index
    @articles = current_user.articles.published
      .includes(:category)
      .order(visits: "desc")
      .page(params[:page])
      .per(9)
  end
end
