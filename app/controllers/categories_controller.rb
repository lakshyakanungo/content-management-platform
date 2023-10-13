# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: { categories: }
  end

  def create
    puts category_params
    Category.create!(name: category_params[:name])
    # render status: :ok, json: {}
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
