# frozen_string_literal: true

class Articles::ReportsController < ApplicationController
  def create
    ReportsWorker.perform_async(current_user.id, report_file_path.to_s)
    respond_with_success(t("in_progress", action: "Report generation"))
  end

  def download
    unless current_user.report.attached?
      respond_with_error(t("not_found", entity: "report"), :not_found) and return
    end

    data = Base64.encode64(current_user.report.download)
    send_data data, filename: pdf_file_name, content_type: "application/pdf"

  end

  private

    def report_file_path
      @_report_file_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "analytics_report.pdf"
    end
end
