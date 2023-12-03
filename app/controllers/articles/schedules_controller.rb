# frozen_string_literal: true

require "sidekiq/api"

class Articles::SchedulesController < ApplicationController
  before_action :load_article!

  def delete
    job_id = @article.schedule.job_id
    job = Sidekiq::ScheduledSet.new.find_job(job_id)
    job.delete
    @article.schedule.delete
    respond_with_success(t("article.schedule.deleted"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
