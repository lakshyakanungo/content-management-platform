# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 255
  has_many :articles

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
