# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :check_if_redirection_url

  def index
    render
  end

  def check_if_redirection_url
    redirection = Redirection.find_by(from: request.path)
    if redirection
      url = add_scheme_to_url_if_needed redirection.to
      # puts url, "REDIRECTING HERE"
      redirect_to url, allow_other_host: true, status: 301
    end
  end

  def add_scheme_to_url_if_needed(url)
    return url if url.starts_with?("/")

    uri = URI.parse(url)

    if !uri.scheme.present?
      URI.join("https:/", url).to_s
    else
      url
    end
  end
end
