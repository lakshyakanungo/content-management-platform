# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :job_id, presence: true
end
