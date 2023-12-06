# frozen_string_literal: true

class Seeder::BaseDataSeederService
  include FactoryBot::Syntax::Methods

  def process
    puts "Seeding the database with sample data"

    user = create(:user)
    puts 'Done! Olvier with email "oliver@example.com" is the default user'

    site = create(:site, user_id: user.id)
    puts "Added default site!"

    Seeder::CategorySeederService.new.process user, site
    Seeder::ArticleSeederService.new.process user
  end
end
