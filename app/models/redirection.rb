# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255
  VALID_FROM_PATH_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  VALID_TO_PATH_REGEX = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?\z/

  belongs_to :user

  validates :from, presence: true, length: { maximum: MAX_LENGTH }, format: { with: VALID_FROM_PATH_REGEX },
    uniqueness: true
  validates :to, presence: true, length: { maximum: MAX_LENGTH }, format: { with: VALID_TO_PATH_REGEX }
end
