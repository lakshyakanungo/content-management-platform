# frozen_string_literal: true

class SiteSetting < ApplicationRecord
  MAX_TITLE_LENGTH = 40
  MIN_PASSWORD_LENGTH = 6
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  VALID_PASSWORD_REGEX = /\A(?=.*[a-zA-Z])(?=.*\d).+\z/

  has_secure_password(validations: false)

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates_inclusion_of :is_password_protected, in: [true, false]
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH },
    format: { with: VALID_PASSWORD_REGEX },
    if: :has_authentication?

  def has_authentication?
    is_password_protected == true && password.present?
  end
end
