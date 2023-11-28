# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    ActionCable.server.broadcast(1, { message: t("report.render"), progress: 25 })

    current_user = User.find(user_id)
    articles = current_user.articles.published.includes(:category).order(visits: :desc)

    html_report = ApplicationController.render(
      assigns: {
        articles:
      },
      template: "articles/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(1, { message: t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string html_report
    current_user = User.find(user_id)
    ActionCable.server.broadcast(1, { message: t("report.upload"), progress: 75 })

    if current_user.report.attached?
      current_user.report.purge_later
    end
    current_user.report.attach(
      io: StringIO.new(pdf_report), filename: "analytics_report.pdf",
      content_type: "application/pdf")
    current_user.save!
    ActionCable.server.broadcast(1, { message: t("report.attach"), progress: 100 })
  end
end
