# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    user
    name { Faker::Name.name }
  end
end
