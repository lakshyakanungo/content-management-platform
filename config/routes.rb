# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], module: :articles do
      collection do
        delete "bulk_destroy"
        put "bulk_update"
        get "search"
        put "restore_version", to: "versions#restore"
        get "analytics", to: "analytics#index"
        delete "delete_scheduled_job", to: "schedules#delete"
        resource :report, only: :create do
          get :download, on: :collection
        end
      end
    end
    resources :categories, except: %i[show new edit] do
      get "search", on: :collection
    end
    resources :redirections, except: %i[show new edit]
    resource :site, only: %i[show update]
    resource :session, only: :create

    namespace :public do
      resources :articles, only: %i[index show], param: :slug do
        get "search", on: :collection
      end
    end

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
