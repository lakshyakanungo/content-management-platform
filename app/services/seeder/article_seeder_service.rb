# frozen_string_literal: true

class Seeder::ArticleSeederService
  def process
    Constants::ARTICLES.each do |article|
      User.first.articles.create! article
    end

    puts "Added sample articles."
  end
end
