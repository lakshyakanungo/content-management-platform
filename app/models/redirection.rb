# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255

  validates :from, presence: true, length: { maximum: MAX_LENGTH }
  validates :to, presence: true, length: { maximum: MAX_LENGTH }
end
