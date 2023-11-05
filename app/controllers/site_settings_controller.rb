# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  before_action :load_current_setting

  def show
    render
  end

  def update
    # puts "SETTING BEFORE : "
    # puts @setting.inspect

    if site_settings_params[:is_password_protected] == false
      @setting.update!(password_digest: nil)
    end
    # if site_settings_params[:is_password_protected] == true || site_settings_params.has_key?(:password)
    #   @setting.regenerate_authentication_token
    # end
    @setting.update!(site_settings_params)

    # regenerate only after valid password updation
    if site_settings_params.has_key?(:password)
      @setting.regenerate_authentication_token
    end

    # puts "SETTING AFTER : "
    # puts @setting.inspect
  end

  private

    def site_settings_params
      params.require(:site_settings).permit(:is_password_protected, :password, :title)
    end

    def load_current_setting
      @setting = SiteSetting.first
    end
end
