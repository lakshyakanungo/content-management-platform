# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_using_x_auth_token
  end

  private

    def authenticate_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence

      # TODO: See how its implemented in LRRB and rectify if possible
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(
        Site.first&.authentication_token,
        auth_token)

      if Site.first.is_password_protected && !is_valid_token
        respond_with_error(t("unauthorised_request"), :forbidden)
      end
    end
end
