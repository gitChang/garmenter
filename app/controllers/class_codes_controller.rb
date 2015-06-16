class ClassCodesController < ApplicationController

  # POST /api/class_codes
  def create
    sleep 2
    render json: { new_class_code: params[:new_class_code] }
  end

end
