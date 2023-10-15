# frozen_string_literal: true

class OpenGraphsController < ApplicationController
  def show
    open_graph = OpenGraph.first
    render status: :ok, json: { open_graph: }
  end

  def update
    OpenGraph.first.update!(open_graph_params)
  end

  private

    def open_graph_params
      params.require(:open_graph).permit(:title)
    end
end
