# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    site
    from { "/test" }
    to { "https://spinkart.scribbl.com" }
  end
end
