# frozen_string_literal: true

class CategoryDeletionService
  include ApiResponders

  attr_reader :category

  def initialize(id)
    @category = load_category! id
  end

  def process(final_category_id)
    delete_category final_category_id
  end

  private

    def delete_category(final_category_id)
      if Category.count != 1
        move_articles(final_category_id)
      elsif category.name != "General"
        new_category = Category.create!(name: "General", user_id: User.first.id)
        move_articles(new_category.id)
      else
        return false
      end

      category.destroy!
      true
    end

    def move_articles(final_category_id)
      category.articles.update!(category_id: final_category_id)
    end

    def load_category!(id)
      Category.find(id)
    end
end
