class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def index
    # render index html.
  end


  # might help to
  # traffic
  def pause
    sleep 1
  end


  # show in console
  def put_inspect(object)
    puts ""
    puts '==========================='
    puts "#{object.inspect}"
    puts '==========================='
    puts ""
  end


  # get the first hash
  def get_error(errors)
    errors.first
  end

end
