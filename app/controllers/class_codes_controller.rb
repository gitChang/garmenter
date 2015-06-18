class ClassCodesController < ApplicationController

  # GET /api/class_codes/English.json
  def index
    class_codes = ClassCode.fetch_with_discipline(params[:discipline])
    puts "=======> #{class_codes}"
    render json: class_codes
  end


  # POST /api/class_codes.json
  def create
    new_class_code = ClassCode.new(class_code_params)
    
    sleep 2

    if new_class_code.save
      head :ok
    else
      render json: extract_first_error(new_class_code.errors)
    end
  end

  
  private

  
    def class_code_params
      {
        data_discipline: params[:discipline], 
        data_user: 'puchu2', 
        code: params[:new_class_code]    
      }
    end

  
    def extract_first_error(errors)
      error = errors.as_json.to_a.last[1].first
    end
end
