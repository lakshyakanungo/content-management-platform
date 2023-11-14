# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    title { Faker::Name.name }
    is_password_protected { true }
  end
end
