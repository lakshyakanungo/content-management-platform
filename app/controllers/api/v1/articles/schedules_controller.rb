# frozen_string_literal: true

require "sidekiq/api"

class Api::V1::Articles::SchedulesController < ApplicationController
  before_action :load_article!

  def destroy
    job_id = @article.schedule.job_id
    job = Sidekiq::ScheduledSet.new.find_job(job_id)
    job.delete
    @article.schedule.delete
    respond_with_success(t("successfully_deleted", entity: "Scheduled update", count: 1))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
