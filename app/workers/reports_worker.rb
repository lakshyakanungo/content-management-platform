# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    current_user = User.find(user_id)
    articles = current_user.articles.published.includes(:category).order(visits: :desc)

    html_report = ApplicationController.render(
      assigns: {
        articles:
      },
      template: "articles/report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report

    current_user = User.find(user_id)
    if current_user.report.attached?
      current_user.report.purge_later
    end
    current_user.report.attach(
      io: StringIO.new(pdf_report), filename: "analytics_report.pdf",
      content_type: "application/pdf")
    current_user.save!
  end
end
