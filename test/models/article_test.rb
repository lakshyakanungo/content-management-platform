# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @site = create(:site, user_id: @user.id)
    @category = create(:category, user_id: @user.id, site_id: @site.id)
    @article = create(:article, user_id: @user.id, category_id: @category.id)
  end

  def test_values_of_created_at_and_updated_at
    article = build(:article, user_id: @user.id, category_id: @category.id)
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

  def test_article_should_not_be_valid_without_category
    @article.category_id = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
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
      create(:article, user_id: @user.id, category_id: @category.id)
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
      @article.status = "test value"
    end
  end

  def test_article_should_have_last_published_date_once_published
    @article.status = "published"
    @article.save!
    assert_not @article.last_published_at.nil?
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(
      title: "fishing", user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")
    second_article = Article.create!(
      title: "fish", user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")

    assert_equal "fishing", first_article.slug
    assert_equal "fish", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another test article", user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")

    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated article title"
      @article.update!(title: updated_article_title)
      assert_equal updated_article_title, @article.title
    end
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_article = Article.create!(
      title: title_having_new_title_as_substring, user_id: @user.id,
      category_id: @category.id, body: "<p>Test body</p>")
    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug

    new_article = Article.create!(
      title: new_title, user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"

    existing_article = Article.create!(
      title: title_having_new_title_as_ending_substring, user_id: @user.id,
      category_id: @category.id, body: "<p>Test body</p>")
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_article.slug

    new_article = Article.create!(
      title: new_title, user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_article = Article.create!(
      title: title_with_numbered_substring, user_id: @user.id,
      category_id: @category.id, body: "<p>Test body</p>")
    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "buy"
    new_article = Article.create!(
      title: substring_of_existing_slug, user_id: @user.id, category_id: @category.id,
      body: "<p>Test body</p>")

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10, user_id: @user.id, category_id: @category.id, body: "<p>Test body</p>")
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
