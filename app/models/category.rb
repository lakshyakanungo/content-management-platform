# frozen_string_literal: true

class Category < ApplicationRecord
  acts_as_list

  MAX_NAME_LENGTH = 255
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  DEFAULT_CATEGORY_NAME = "General"

  belongs_to :user, counter_cache: true
  belongs_to :site
  has_many :articles, dependent: :destroy

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }, format: { with: VALID_NAME_REGEX },
    uniqueness: true
end
