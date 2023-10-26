# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: [:destroy, :update]

  def index
    @redirections = current_user.redirections.order(:created_at)
  end

  def create
    current_user.redirections.create!(redirection_params)
  end

  def destroy
    @redirection.destroy!
  end

  def update
    @redirection.update!(redirection_params)
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = current_user.redirections.find(params[:id])
    end
end
