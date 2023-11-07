# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  before_action :load_current_setting

  def show
    render
  end

  def update
    if site_settings_params[:is_password_protected] == false
      site_settings_params.merge!(password_digest: nil)
    end

    @setting.update!(site_settings_params)

    if site_settings_params.has_key?(:password)
      @setting.regenerate_authentication_token
    end
  end

  private

    def site_settings_params
      params.require(:site_settings).permit(:is_password_protected, :password, :title)
    end

    def load_current_setting
      @setting = SiteSetting.first
    end
end
