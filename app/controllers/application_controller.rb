# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :add_default_user

  def add_default_user
    @user = User.first
    puts "created user : ", @user.name
  end

  def current_user
    @user
  end
end
