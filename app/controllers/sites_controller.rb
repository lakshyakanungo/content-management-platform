# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site

  def show
    render
  end

  def update
    if site_params[:is_password_protected] == false
      site.update!(site_params.merge(password_digest: nil))
    else
      site.update!(site_params)
    end

    site.regenerate_authentication_token if site_params.has_key?(:password)

    respond_with_success(
      t(
        "successfully_updated", entity: entity_for_reponding,
        count: 1))
  end

  private

    def site_params
      params.require(:site).permit(:is_password_protected, :password, :title)
    end

    def entity_for_reponding
      if site_params[:password].present?
        "Password"
      elsif site_params[:title].present?
        "Site title"
      else
        "Site"
      end
    end
end
