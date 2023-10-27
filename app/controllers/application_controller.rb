# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Loggable

  before_action :add_default_user

  def add_default_user
    @user = User.first
  end

  def current_user
    @user
  end
end
