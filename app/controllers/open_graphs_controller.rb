# frozen_string_literal: true

class OpenGraphsController < ApplicationController
  before_action :load_open_graph!

  def show
    # open_graph = OpenGraph.first
    render status: :ok, json: { open_graph: @open_graph }
  end

  def update
    # OpenGraph.first.update!(open_graph_params)
    @open_graph.update!(open_graph_params)
  end

  private

    def open_graph_params
      params.require(:open_graph).permit(:title)
    end

    def load_open_graph!
      @open_graph = current_user.open_graph
    end
end
