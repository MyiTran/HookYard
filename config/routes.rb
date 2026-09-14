Rails.application.routes.draw do
  get '/erd', to: 'docs#erd' if Rails.env.development?

  authenticate :user, ->(user) { user.has_role?(:admin) } do
    mount Sidekiq::Web => '/sidekiq'
    get '/admin/console', to: 'admin/console#index' unless Rails.env.production?
  end

  devise_for :users,
    skip: [:registrations],
    controllers: {
      sessions: 'authentication/sessions',
      passwords: 'authentication/passwords'
    }

  devise_scope :user do
    get '/users/sign_up', to: 'authentication/registrations#new'
    post '/users', to: 'authentication/registrations#create'
    get '/api/me', to: 'authentication/sessions#current'
  end

  namespace :admin do
    root to: 'dashboard#index'
    resources :users
  end

  root 'dashboard#index'
  get '/up', to: 'rails/health#show', as: :rails_health_check
end
