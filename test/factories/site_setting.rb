# frozen_string_literal: true

FactoryBot.define do
  factory :site_setting do
    title { Faker::Name.name }
    is_password_protected { false }
  end
end
