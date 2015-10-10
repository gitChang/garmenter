class UserSessionsController < ApplicationController

  def create
    pause

    user = login(params[:account_name], params[:password])

    if user
      unless user.approved
        logout
        render json: { msg: 'Your account is pending for Admin\'s Approval.' }, status: 301
        return
      end
      render json: { auth: true }, status: 200
      return
    end

    render json: { auth: false }, status: 301
  end


  def destroy
    logout
    render json: { deauth: true }, status: 200
  end

end
