Rails.application.routes.draw do

  root 'application#index'

  # only API response. must declare before *path
  # to avoid format render problem. try it to
  # see the problem.
  scope 'api', defaults: { format: 'json' } do
    resources :questions, except: [:edit, :delete]

    resources :disciplines do
      resources :class_codes, only: [:index, :create]
    end

    resources :question_types, only: [:index]
    resources :choices, only: [:create]
    resources :answers, only: [:create]

    resources :questionnaires, except: [:edit, :delete]

    resources :questionnaires do
      resources :questionnaire_candidates, only: [:index]
    end

    resources :questionnaire_candidates, only: [:destroy]

    resources :exams, only: [:index, :destroy] do
      collection do
        post :prepare
        get  :focus
        post :skip
        get  :skip_items
        post :answer
        get  :result
      end
    end
  end

  # must be declared after api to prevent
  # format render problem.
  get  '*path' => 'application#index'


  # non-API resources.
  resources :questions, only: [:new]

  resources :disciplines do
    resources :class_codes, only: [:new]
  end



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
