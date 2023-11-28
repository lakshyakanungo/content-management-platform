class Public::ArticlesCarrier
  attr_reader :articles

  def initialize(articles)
    @articles=articles
  end

  def grouped_by_category
    articles
      .select(:id, :title, :slug, :category_id)
      .group_by { |article| article.category.name }
      .to_a
  end
end
