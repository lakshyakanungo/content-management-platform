# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all.order(:position)
    render status: :ok, json: { categories: }
  end

  def create
    puts category_params
    Category.create!(name: category_params[:name])
    # render status: :ok, json: {}
  end

  def update
    category = Category.find(params[:id])
    # category.update!(name: category_params[:name])
    category.update!(category_params)
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy!
  end

  def reorder
    category = Category.find(params[:id])
    category.insert_at(category_params[:position])
  end

  private

    def category_params
      params.require(:category).permit(:name, :position)
    end
end
