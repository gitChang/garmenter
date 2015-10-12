class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  before_action      :require_login
  skip_before_action :require_login, only: [:index, :user_access, :get_auth_token]


  def index;end


  def user_access
    # update cookies
    cookies[:xsrf_token] = form_authenticity_token
    # send signal user status logged in
    render json: logged_in?
  end

end
