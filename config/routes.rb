# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq
  draw :api

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit] do
      collection do
        delete "bulk_destroy"
        put "bulk_update"
        get "search"
        put "restore_version"
        get "analytics"
      end
    end
    resources :categories, except: %i[show new edit] do
      get "search", on: :collection
    end
    resources :redirections, except: %i[show new edit]
    resource :site_settings, only: %i[show update]
    resource :session, only: :create
    resources :euis, only: %i[index show], param: :slug do
      get "search", on: :collection
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
