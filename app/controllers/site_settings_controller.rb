# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  before_action :load_current_setting

  def show
    is_password_protected = @setting.is_password_protected
    title = @setting.title
    render status: :ok, json: { is_password_protected:, title: }
  end

  def update
    @setting.update!(password_digest: nil) if site_settings_params[:is_password_protected] == false
    @setting.update!(site_settings_params)
  end

  def authenticate
    authenticated = @setting.authenticate(site_settings_params[:password])

    respond_with_error "The password you entered is incorrect." unless authenticated
  end

  private

    def site_settings_params
      params.require(:site_settings).permit(:is_password_protected, :password, :title)
    end

    def load_current_setting
      @setting = SiteSetting.first
    end
end
