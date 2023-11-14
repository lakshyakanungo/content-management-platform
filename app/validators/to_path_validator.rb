# frozen_string_literal: true

class ToPathValidator < ActiveModel::Validator
  VALID_TO_PATH_URL_REGEX = /\A\/[a-zA-Z0-9\-\.\/]*\z/i
  VALID_TO_FULL_URL_REGEX = /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i

  def validate(record)
    if record.to.starts_with? "/"
      to_path_regex = VALID_TO_PATH_URL_REGEX
    else
      to_path_regex = VALID_TO_FULL_URL_REGEX
    end

    unless record.to.match? to_path_regex
      record.errors.add(:to, I18n.t("redirection.error.to"))
    end
  end
end
