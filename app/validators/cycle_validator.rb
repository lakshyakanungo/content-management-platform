# frozen_string_literal: true

class CycleValidator < ActiveModel::Validator
  def validate(record)
    @from_path = record.from

    redirection = record
    while redirection.present?
      redirection_to_pathname = redirection.to
      if redirection.to == @from_path
        record.errors.add(:base, I18n.t("redirection.error.cyclic"))
        break
      end
      redirection = Redirection.find_by(from: redirection.to)
    end
  end
end
