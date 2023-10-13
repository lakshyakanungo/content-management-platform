# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq
  draw :api

  resources :articles, only: [:index, :update, :destroy] do
    collection do
      post "destroy_multiple"
      post "update_multiple"
      get "search"
    end
  end

  resources :categories, only: [:index, :create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
