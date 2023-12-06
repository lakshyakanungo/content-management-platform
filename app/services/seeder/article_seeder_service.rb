# frozen_string_literal: true

class Seeder::ArticleSeederService
  include FactoryBot::Syntax::Methods

  def process(user)
    user.categories.each do |category|
      5.times do
        create(:article, user_id: user.id, category_id: category.id)
      end
    end

    update_random_articles!
    puts "Added articles under each category"
  end

  private

    def update_random_articles!
      Article.all.sample(12).each do |article|
        article.update!(status: "published", title: Faker::Lorem.sentence[0..49])
      end
    end
end
