# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 255
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  MAX_EMAIL_LENGTH = 255

  has_many :articles, dependent: :destroy
  has_many :categories, dependent: :destroy

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase_email

  private

    def to_lowercase_email
      email.downcase!
    end
end
