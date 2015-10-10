class UserSessionsController < ApplicationController

  def create
    sleep 2
    user = login(params[:account_name], params[:password])
    puts ""
    puts "==============="
    puts "#{logged_in?}"
    puts "==============="

    if user
      render json: { auth: true }, status: 200
    else
      render json: { auth: false }, status: 301
    end
  end


  def destroy
    logout
    redirect_to '/login'
  end

end
