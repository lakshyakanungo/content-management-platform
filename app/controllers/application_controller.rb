# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Loggable

  def current_user
    @_current_user ||= User.first
  end

  def load_site_setting
    @site_setting = SiteSetting.first
  end
end
