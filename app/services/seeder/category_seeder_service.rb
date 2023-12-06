# frozen_string_literal: true

class Seeder::CategorySeederService
  include FactoryBot::Syntax::Methods

  def process(user, site)
    5.times do
      create(:category, user_id: user.id, site_id: site.id)
    end

    puts "Added sample categories"
  end
end
