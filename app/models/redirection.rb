# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255

  validates :from, presence: true, length: { maximum: MAX_LENGTH }, uniqueness: true
  validates :to, presence: true, length: { maximum: MAX_LENGTH }

  validate :valid_from_path
  validate :valid_to_path
  validate :to_and_from_not_equal
  validate :check_redirection_loop

  private

    def valid_from_path
      errors.add(:from, "Invalid from path") unless self.from.starts_with? "/"
    end

    def valid_to_path
      check_to_path_has_domain unless self.to.starts_with? "/"
    end

    def check_to_path_has_domain
      errors.add(:to, "Invalid to path") unless self.to.split(".").second.present?
    end

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
