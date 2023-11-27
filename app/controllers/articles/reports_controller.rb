# frozen_string_literal: true

class Articles::ReportsController < ApplicationController
  def create
    puts report_file_path.inspect, "Check"
    ReportsWorker.perform_async(current_user.id, report_file_path.to_s)
    respond_with_success(t("in_progress", action: "Report generation"))
  end

  def download
    if File.exist?(report_file_path)
      send_file(
        report_file_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
      # respond_with_json see: "good"
      # File.open(report_file_path, "r") do |f|
      #   puts f.read, "DATAAA"
      #   send_data f.read, type: "application/pdf", filename: pdf_file_name
      # end
    else
      respond_with_error(t("not_found", entity: "report"), :not_found)
    end
    puts "coming here?"
  end

  private

    def report_file_path
      @_report_file_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "analytics_report.pdf"
    end
end
