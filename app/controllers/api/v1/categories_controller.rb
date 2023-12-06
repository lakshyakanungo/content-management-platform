# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    @categories = site.categories.order("position ASC")
  end

  def search
    query = params[:name].downcase
    @search_results = site.categories.where("lower(name) LIKE ?", "%#{query}%").order("position ASC")
  end

  def create
    site.categories.create!(name: category_params[:name], user_id: current_user.id)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(
      t("successfully_updated", entity: "Category", count: 1)) unless category_params[:position].present?
  end

  def destroy
    category_deletion_service = CategoryDeletionService.new(params[:id], current_user, site)
    category_deletion_service.process(category_params[:move_into_category_id])
    respond_with_success(t("successfully_deleted", entity: "Category", count: 1))
  end

  private

    def category_params
      params.require(:category).permit(:name, :position, :id, :move_into_category_id)
    end

    def load_category!
      @category = site.categories.find(params[:id])
    end
end
