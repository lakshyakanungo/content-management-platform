# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  PROGRESS_AFTER_STARTING_RENDERING = 25
  PROGRESS_AFTER_HTML_GENERATION = 50
  PROGRESS_AFTER_PDF_GENERATION = 75
  PROGRESS_AFTER_COMPLETION = 100
  SUBSCRIBER_ID = 1

  def perform(user_id)
    broadcast_progress(t("report.render"), PROGRESS_AFTER_STARTING_RENDERING)

    current_user = User.find(user_id)
    html_report = load_html_report(current_user)
    broadcast_progress(t("report.generate"), PROGRESS_AFTER_HTML_GENERATION)

    pdf_report = generate_pdf(html_report)
    broadcast_progress(t("report.upload"), PROGRESS_AFTER_PDF_GENERATION)

    attach_pdf(current_user, pdf_report)
    broadcast_progress(t("report.attach"), PROGRESS_AFTER_COMPLETION)
  end

  private

    def load_html_report(current_user)
      articles = current_user.articles.published.includes(:category).order(visits: :desc)
      ApplicationController.render(
        assigns: {
          articles:
        },
        template: "api/v1/articles/report/download",
        layout: "pdf")
    end

    def generate_pdf(html_report)
      WickedPdf.new.pdf_from_string html_report
    end

    def attach_pdf(current_user, pdf_report)
      if current_user.report.attached?
        current_user.report.purge_later
      end
      current_user.report.attach(
        io: StringIO.new(pdf_report), filename: "analytics_report.pdf",
        content_type: "application/pdf")
      current_user.save!
    end

    def broadcast_progress(message, progress)
      ActionCable.server.broadcast(SUBSCRIBER_ID, { message:, progress: })
    end
end
