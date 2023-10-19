# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq
  draw :api

  constraints(lambda { |req| req.format == :json }) do
  resources :articles, only: [:index, :create, :update, :destroy] do
    collection do
      post "destroy_multiple"
      post "update_multiple"
      get "search"
      get "grouped"
    end
  end
  resources :categories, only: [:index, :create, :update, :destroy] do
    member do
      get :reorder
    end
  end
  resource :open_graph, only: [:show, :update]
  resources :redirections, only: [:index, :create, :update, :destroy]
  resource :site_settings, only: [:show, :update]
end

  Redirection.all.each do |redirection|
    get "#{redirection.from}", to: redirect("#{redirection.to}", status: 301), only_path: false
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
