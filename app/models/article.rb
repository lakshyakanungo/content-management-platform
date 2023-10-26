# frozen_string_literal: true

class Article < ApplicationRecord
  scope :by_categories, ->(category_ids) { where(category_id: category_ids) unless category_ids.nil? }
  scope :by_status, ->(status) { where(status:) unless status == "All" }

  MAX_TITLE_LENGTH = 125
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { Draft: "Draft", Published: "Published" }, default: :Draft
  belongs_to :user
  belongs_to :category, counter_cache: true

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates :body, presence: true
  before_save :update_last_published_at

  private

    def update_last_published_at
      self.last_published_at = Time.zone.now if self.status_changed? && self.status == "Published"
    end
end
