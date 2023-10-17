# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255

  belongs_to :user

  validates :from, presence: true, length: { maximum: MAX_LENGTH }
  validates :to, presence: true, length: { maximum: MAX_LENGTH }
end
