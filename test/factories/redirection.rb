# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    user
    from { "/test" }
    to { Faker::Internet.url }
  end
end
