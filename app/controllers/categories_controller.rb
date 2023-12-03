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
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category", count: 1))
  end

  def destroy
    category_deletion_service = CategoryDeletionService.new(params[:id], current_user)
    category_deletion_service.process(category_params[:move_into_category_id])
    respond_with_success(t("successfully_deleted", entity: "Category", count: 1))
  end

  private

    def category_params
      params.require(:category).permit(:name, :position, :id, :move_into_category_id)
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
