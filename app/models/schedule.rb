# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :time, presence: true
  validates :job_id, presence: true
end
