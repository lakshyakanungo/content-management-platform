# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    respond_with_error(t("invalid_password"), :unauthorized) unless site.authenticate(session_params[:password])
  end

  private

    def session_params
      params.require(:session).permit(:password)
    end
end
