# frozen_string_literal: true

class CategoryDeletionService
  attr_reader :category, :current_user

  def initialize(id, current_user)
    @current_user = current_user
    @category = Category.find(id)
  end

  def process(final_category_id)
    delete_category final_category_id
  end

  private

    def delete_category(final_category_id)
      check_for_default_category_deletion!

      if last_category?
        new_category = current_user.categories.create!(name: Category::DEFAULT_CATEGORY_NAME)
        move_articles(new_category.id)
      else
        move_articles(final_category_id)
      end

      category.destroy!
    end

    def move_articles(final_category_id)
      category.articles.update!(category_id: final_category_id)
    end

    def check_for_default_category_deletion!
      raise ArgumentError.new(I18n.t("errors.default_category_deletion")) if default_category_deletion?
    end

    def default_category_deletion?
      last_category? && category.name == Category::DEFAULT_CATEGORY_NAME
    end

    def last_category?
      current_user.categories.count == 1
    end
end
