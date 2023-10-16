# frozen_string_literal: true

class RedirectionsController < ApplicationController
  def index
    redirections = Redirection.all.order(:created_at)
    render status: :ok, json: { redirections: }
  end

  def create
    Redirection.create!(redirection_params)
  end

  def destroy
    load_redirection!.destroy!
  end

  def update
    load_redirection!.update!(redirection_params)
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      Redirection.find(params[:id])
    end
end
