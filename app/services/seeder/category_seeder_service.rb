# frozen_string_literal: true

class Seeder::CategorySeederService
  def process(site)
    Constants::CATEGORIES.each do |category|
      User.first.categories.create! category.merge(site_id: site.id)
    end

    puts "Added sample categories."
  end
end
