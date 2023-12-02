# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    authenticated = site.authenticate(session_params[:password])
    respond_with_error(t("invalid_password"), :unauthorized) unless authenticated
  end

  private

    def session_params
      params.require(:session).permit(:password)
    end
end
