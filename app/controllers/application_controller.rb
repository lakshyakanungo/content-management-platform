# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Loggable

  def current_user
    @_current_user ||= User.first
  end
end
