# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255
  VALID_FROM_PATH_URL_REGEX = /\A\/[a-zA-Z0-9\-\.\/]+\z/i

  validates :from, presence: true, length: { maximum: MAX_LENGTH }, format: { with: VALID_FROM_PATH_URL_REGEX },
    uniqueness: true
  validates :to, presence: true, length: { maximum: MAX_LENGTH }

  validates_with ToPathValidator
  validates_with EqualToAndFromPathValidator
  validates_with CycleValidator
end
