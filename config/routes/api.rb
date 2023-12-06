# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    constraints(lambda { |req| req.format == :json }) do
      namespace :articles do
        put "restore_version", to: "versions#restore"
        get "analytics", to: "analytics#index"
        delete "delete_scheduled_job", to: "schedules#destroy"
        resource :report, only: :create do
          get :download, on: :collection
        end
      end
      resources :articles, except: %i[new edit] do
        collection do
          delete "bulk_destroy"
          put "bulk_update"
          get "search"
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
  end
end
