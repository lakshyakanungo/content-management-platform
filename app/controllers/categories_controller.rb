# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy, :reorder]

  def index
    # categories = Category.all.order(:position)
    categories = current_user.categories.order(:position)
    render status: :ok, json: { categories: }
  end

  def create
    # puts category_params
    # Category.create!(name: category_params[:name], user_id: current_user.id)
    current_user.categories.create!(name: category_params[:name])
  end

  def update
    # category.update!(name: category_params[:name])
    @category.update!(category_params)
  end

  def destroy
    @category.destroy!
  end

  def reorder
    @category.insert_at(category_params[:position])
  end

  private

    def category_params
      params.require(:category).permit(:name, :position)
    end

    def load_category!
      # category = Category.find(params[:id])
      @category = current_user.categories.find(params[:id])
    end
end
