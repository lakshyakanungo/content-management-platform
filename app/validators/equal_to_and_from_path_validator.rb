# frozen_string_literal: true

class EqualToAndFromPathValidator < ActiveModel::Validator
  def validate(record)
    if record.to == record.from
      record.errors.add(:base, I18n.t("redirection.error.paths_equal"))
    end
  end
end
