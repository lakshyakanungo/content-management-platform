# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :load_site_setting

  def create
    authenticated = @site_setting.authenticate(session_params[:password])

    respond_with_error(t("invalid_password"), :unauthorized) unless authenticated
  end

  private

    def session_params
      params.require(:session).permit(:password)
    end
end
