# frozen_string_literal: true

class SiteSetting < ApplicationRecord
  MIN_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /\A(?=.*[a-zA-Z])(?=.*\d).+\z/

  has_secure_password(validations: false)

  validates_inclusion_of :is_password_protected, in: [true, false]
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH },
    format: { with: VALID_PASSWORD_REGEX },
    if: :checkup?

  def checkup?
    is_password_protected == true && password.present?
  end
end
