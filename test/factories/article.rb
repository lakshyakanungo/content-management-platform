# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    user
    category
    title { Faker::Lorem.sentence[0..49] }
    author { "Oliver" }
    body { Faker::Lorem.sentence[0..49] }
    status { "draft" }
  end
end
