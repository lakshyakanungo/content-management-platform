# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255
  VALID_FROM_PATH_URL_REGEX = /\A\/[a-zA-Z0-9\-\.\/]+\z/i
  VALID_TO_PATH_URL_REGEX = /\A\/[a-zA-Z0-9\-\.\/]*\z/i
  VALID_TO_FULL_URL_REGEX = /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i

  validates :from, presence: true, length: { maximum: MAX_LENGTH }, format: { with: VALID_FROM_PATH_URL_REGEX },
    uniqueness: true
  validates :to, presence: true, length: { maximum: MAX_LENGTH }

  validate :valid_to_path_format
  validate :to_and_from_not_equal
  validate :not_causing_cycling_redirection

  private

    def valid_to_path_format
      if self.to.starts_with? "/"
        to_path_regex = VALID_TO_PATH_URL_REGEX
      else
        to_path_regex = VALID_TO_FULL_URL_REGEX
      end

      unless self.to.match? to_path_regex
        errors.add(:to, I18n.t("redirection.error.to"))
      end
    end

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:base, I18n.t("redirection.error.paths_equal"))
      end
    end

    def not_causing_cycling_redirection
      @from_path = self.from

      redirection = self
      while redirection.present?
        redirection_to_pathname = redirection.to
        if redirection.to == @from_path
          errors.add(:base, I18n.t("redirection.error.cyclic"))
          break
        end
        redirection = Redirection.find_by(from: redirection.to)
      end
    end
end
