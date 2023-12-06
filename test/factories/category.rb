# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    user
    site
    name { Faker::Science.science }
  end
end
