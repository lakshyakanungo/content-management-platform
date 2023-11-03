# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    @categories = current_user.categories.order("position ASC")
  end

  def search
    query = params[:name].downcase
    @search_results = current_user.categories.where("lower(name) LIKE ?", "%#{query}%").order("position ASC")
  end

  def create
    current_user.categories.create!(name: category_params[:name])
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    if current_user.categories_count == 1
      new_category = current_user.categories.create!(name: "General")
      move_articles(new_category.id)
    else
      move_articles(category_params[:move_into_category_id])
    end
    @category.destroy!
  end

  private

    def category_params
      params.require(:category).permit(:name, :position, :id, :move_into_category_id)
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def move_articles(new_category_id)
      @category.articles.update!(category_id: new_category_id)
    end
end
