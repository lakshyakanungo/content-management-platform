# frozen_string_literal: true

class Api::V1::Articles::VersionsController < ApplicationController
  before_action :load_article!

  def restore
    version = @article.versions.find(article_params[:version_id]).reify
    @article.update!(
      version.attributes.slice("title", "body", "category_id").merge(
        {
          status: "draft",
          paper_trail_event: "restore"
        }))
    respond_with_success(t("successfully_restored", entity: "Article version"))
  end

  private

    def article_params
      params.require(:article).permit(:version_id)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
