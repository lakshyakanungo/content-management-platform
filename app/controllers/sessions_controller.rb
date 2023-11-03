# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :load_current_site_setting

  def create
    authenticated = @site_setting.authenticate(session_params[:password])

    respond_with_error("The password you entered is incorrect.", :unauthorized) unless authenticated
  end

  private

    # TODO: See if name showed be :session or login / authentication
    def session_params
      params.require(:session).permit(:password)
    end

    def load_current_site_setting
      @site_setting = SiteSetting.first
    end
end
