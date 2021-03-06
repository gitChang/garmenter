Rails.application.routes.draw do

  root 'application#index'


  # only API response. must declare before *path
  # to avoid format render problem. try it to
  # see the problem.
  scope 'ajax', defaults: { format: 'json' } do

    get 'user_access' => 'application#user_access', as: :user_access
    get 'find_barcode/:invoice_barcode' => 'application#find_barcode', as: :find_barcode

    post 'login' => 'user_sessions#create', as: :login
    post 'logout' => 'user_sessions#destroy', as: :logout

    resources :signup,   only: [:create]

    resources :invoices, only: [:create] do
      collection do
        get :recent
        get :recent_size
        get :history
        get :history_size
        post :close_recent
        post 'delete/:invoice_barcode' => 'invoices#mark_delete', as: :mark_delete
      end
    end

    resources :garments, param: :garment_barcode, only: [:create, :destroy] do
      collection do
        get ':invoice_barcode/quantity' => 'garments#quantity', as: :quantity
      end
    end
    # resources :password_resets, only: [:create, :update]
  end

  scope 'api', defaults: { format: 'json' } do
    resources :invoice_garment, only: [] do
      collection do
        get '/:garment_barcode' => 'invoice_garment#get_invoice', as: :api_get_invoice
      end
    end
  end

  # must be declared after api to prevent
  # format render problem.
  get  '*path' => 'application#index'



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
