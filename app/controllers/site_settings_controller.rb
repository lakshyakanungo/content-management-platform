# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  def show
    is_password_protected = SiteSetting.first.is_password_protected
    has_password = SiteSetting.first.password_digest.present?
    render status: :ok, json: { is_password_protected:, has_password: }
  end

  def update
    SiteSetting.first.update!(site_settings_params)
  end

  private

    def site_settings_params
      params.require(:site_settings).permit(:is_password_protected, :password)
    end
end
