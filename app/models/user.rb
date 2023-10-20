# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 255

  has_many :articles
  has_many :categories
  has_many :redirections

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
