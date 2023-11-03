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
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_save :update_last_published_at
  before_create :set_slug

  private

    def update_last_published_at
      self.last_published_at = Time.zone.now if self.status_changed? && self.status == "Published"
    end

    def set_slug
      title_slug = title.parameterize
      latest_article_slug = Article.where(
        "slug ~* ?",
        "^#{title_slug}$|^#{title_slug}-[0-9]+$",
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
