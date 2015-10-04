class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def index
    # render index html.
  end

  # shared method
  def get_first_error(errors)
    puts "/////===> errors: #{errors.inspect}"
    key = errors.as_json.to_a.first[0].to_s
    value = errors.as_json.to_a.first[1].first

    Hash[key, value]
  end

end
