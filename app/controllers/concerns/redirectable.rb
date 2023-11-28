# frozen_string_literal: true

module Redirectable
  extend ActiveSupport::Concern

  included do
    before_action :check_and_handle_redirection
  end

  private

    def check_and_handle_redirection
      redirection = Redirection.find_by(from: request.path)
      if redirection.present?
        url = add_scheme_to_url_if_needed redirection.to
        redirect_to url, allow_other_host: true, status: :moved_permanently
      end
    end

    def add_scheme_to_url_if_needed(url)
      return url if url.starts_with?("/")

      uri = URI.parse(url)
      url = URI.join("https:/", url).to_s unless uri.scheme.present?
      url
    end
end
