# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_site
  before_action :load_redirection!, only: [:destroy, :update]

  def index
    @redirections = site.redirections.order(:created_at)
  end

  def create
    site.redirections.create!(redirection_params)
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
      @redirection = site.redirections.find(params[:id])
    end
end
