class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_login
  skip_before_action :require_login, only: [:index, :user_access]


  def index
    # request dump
  end

  def user_access
    cookies[:xsrf_token] = form_authenticity_token
    render json: logged_in?
  end

  def find_barcode
    render json: true if Invoice.active.where(invoice_barcode: params[:barcode]).first
    render json: true if Garment.active.where(garment_barcode: params[:barcode]).first
    render json: false
  end

end
