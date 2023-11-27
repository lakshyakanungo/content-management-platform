# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    articles = Article.where(user_id:).published
    content = ApplicationController.render(
      assigns: {
        articles:
      },
      template: "articles/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
