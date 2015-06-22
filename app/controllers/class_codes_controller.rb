class ClassCodesController < ApplicationController

  # GET /api/class_codes/English.json
  def index
    class_codes = ClassCode.fetch_with_discipline(params[:question_discipline])
    render json: class_codes
  end

  # POST /api/class_codes.json
  def create
    new_class_code = ClassCode.new(permitted_params)

    if new_class_code.save
      head :ok
    else
      puts "===> #{get_first_error(new_class_code.errors)}"
      render json: get_first_error(new_class_code.errors), status: :not_acceptable
    end
  end

  private

    def permitted_params
      params.permit(:discipline, :class_code, :question_discipline, :question_class_code)
    end

end
