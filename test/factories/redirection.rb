# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    user
    from { "/test" }
    to { "https://www.google.com" }
  end
end
