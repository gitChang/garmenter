class PasswordResetsController < ApplicationController
  skip_before_action :require_login

  def create
    user = User.find_by_contact_person_email(params[:contact_person_email])
    user.deliver_reset_password_instructions! if user
    render json: true if user
  end

  def update
    token = params[:id]
    user = User.load_from_reset_password_token(params[:id])

    if user.blank?
      not_authenticated
      return
    end

    user.password_confirmation = params[:password_confirmation]
    if user.change_password!(params[:password])
      render json: true
    else
      render json: false
    end
  end

end
