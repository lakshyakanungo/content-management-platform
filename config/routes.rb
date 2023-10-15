# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq
  draw :api

  constraints(lambda { |req| req.format == :json }) do
  resources :articles, only: [:index, :update, :destroy] do
    collection do
      post "destroy_multiple"
      post "update_multiple"
      get "search"
    end
  end
  resources :categories, only: [:index, :create, :update, :destroy]
  resource :open_graph, only: [:show, :update]
end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
