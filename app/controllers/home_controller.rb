# frozen_string_literal: true

class HomeController < ApplicationController
  include Redirectable

  def index
    render
  end
end
