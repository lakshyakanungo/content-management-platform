# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    user
    title { Faker::Name.name }
    is_password_protected { false }
  end
end
