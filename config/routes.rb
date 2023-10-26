# frozen_string_literal: true

Rails.application.routes.draw do
  draw :sidekiq
  draw :api

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[show new edit] do
      collection do
        delete "destroy_multiple"
        put "update_multiple"
        get "search"
        get "grouped_by_category"
      end
    end
    resources :categories, except: %i[show new edit] do
      get "search", on: :collection
    end
    resources :redirections, except: %i[show new edit]
    resource :site_settings, only: [:show, :update] do
      post "authenticate", on: :collection
    end
  end

  Redirection.all.each do |redirection|
    get "#{redirection.from}", to: redirect("#{redirection.to}", status: 301)
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
