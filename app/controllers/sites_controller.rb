# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site

  def show
    render
  end

  def update
    if site_params[:is_password_protected] == false
      site_params.merge!(password_digest: nil)
    end

    @site.update!(site_params)

    if site_params.has_key?(:password)
      @site.regenerate_authentication_token
    end
  end

  private

    def site_params
      params.require(:site).permit(:is_password_protected, :password, :title)
    end
end
