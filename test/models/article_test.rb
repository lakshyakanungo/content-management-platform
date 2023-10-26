# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category)
    @article = create(:article)
  end

  def test_values_of_created_at_and_updated_at
    article = Article.new(
      title: "This is a test article", category_id: @category.id, user_id: @user.id,
      body: "Random content")
    assert_nil article.created_at
    assert_nil article.updated_at

    article.save!
    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at

    article.update!(title: "This is an updated article")
    assert_not_equal article.updated_at, article.created_at
  end

  def test_article_should_not_be_valid_without_user
    @article.user_id = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "User must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[title title_1 title! -title- _title_ /title 1]

    valid_titles.each do |title|
      @article.title = title
      assert @article.valid?
    end
  end

  def test_validation_should_reject_invalid_title
    invalid_titles = %w[/ *** __ ~ ...]

    invalid_titles.each do |title|
      @article.title = title
      assert @article.invalid?
    end
  end

  def test_article_count_increases_on_saving
    assert_difference ["Article.count"] do
      create(:article)
    end
  end

  def test_article_count_decreases_on_deleting
    assert_difference ["Article.count"], -1 do
      @article.delete
    end
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_status
    assert_raises(ActiveRecord::NotNullViolation) do
      @article.status = ""
      @article.save!
    end
  end

  def test_article_status_should_not_allow_random_value
    assert_raises(ArgumentError) do
      @article.status = "Random"
    end
  end

  def test_article_should_have_last_published_date_once_published
    @article.status = "Published"
    @article.save!
    assert_not @article.last_published_at.nil?
  end
end
