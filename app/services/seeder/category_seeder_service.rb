# frozen_string_literal: true

class Seeder::CategorySeederService
  def process
    Constants::CATEGORIES.each do |category|
      User.first.categories.create! category
    end

    puts "Added sample categories."
  end
end
