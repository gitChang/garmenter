class UserSessionsController < ApplicationController

  skip_before_action :require_login, except: :destroy


  def create
    user = login(params[:account_name], params[:password])

    if user
      unless user.approved
        logout
        render json: pending_message, status: 301
        return
      end
      render json: true, status: 200
      return
    end

    render json: false, status: 301
  end


  def destroy
    logout
    render json: false, status: 200
  end


  private

    def pending_message
      msg = 'Your account activation is pending for Admin\'s Approval.'
      Hash[:msg, msg]
    end
end
