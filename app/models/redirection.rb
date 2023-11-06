# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255
  # VALID_FROM_PATH_REGEX = /\A\/[a-zA-Z0-9_\-].*\z/i
  # VALID_TO_PATH_REGEX = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?\z/

  validates :from, presence: true, length: { maximum: MAX_LENGTH },
    #  format: { with: VALID_FROM_PATH_REGEX },
    uniqueness: true
  validates :to, presence: true, length: { maximum: MAX_LENGTH }
  # ,
  #  format: { with: VALID_TO_PATH_REGEX }
  validate :to_and_from_not_equal
  validate :check_redirection_loop

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:base, "To and From paths cannot be equal")
      end
    end

    def check_redirection_loop
      if to_exist_in_from? && from_exist_in_to?
        errors.add(:base, "This redirection causes redirection loop")
      end
    end

    def to_exist_in_from?
      Redirection.where(to: self.from).present?
    end

    def from_exist_in_to?
      Redirection.where(from: self.to).present?
    end
end
