# frozen_string_literal: true

class CategoryDeletionService
  attr_reader :category, :has_error, :current_user

  def initialize(id, current_user)
    @current_user = current_user
    @category = Category.find(id)
    @has_error = false
  end

  def process(final_category_id)
    delete_category final_category_id
  end

  private

    def delete_category(final_category_id)
      if Category.count != 1
        move_articles(final_category_id)
      elsif category.name != "General"
        new_category = current_user.categories.create!(name: "General")
        move_articles(new_category.id)
      else
        @has_error = true
        return
      end

      category.destroy!
    end

    def move_articles(final_category_id)
      category.articles.update!(category_id: final_category_id)
    end
end
