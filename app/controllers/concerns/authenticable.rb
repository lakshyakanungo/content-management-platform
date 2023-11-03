# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token
  end

  private

    def authenticate_user_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence

      # puts "COMPARING "
      # puts auth_token
      # puts SiteSetting.first.authentication_token

      is_valid_token = ActiveSupport::SecurityUtils.secure_compare(
        SiteSetting.first.authentication_token,
        auth_token)

      # puts "VALID REQUEST???", is_valid_token

      if SiteSetting.first.is_password_protected && !is_valid_token
        respond_with_error(t("unauthorised_request"), :forbidden)
      end
    end
end
