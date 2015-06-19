class QuestionsController < ApplicationController

  # POST /api/questions.json
  def create
    render json: params.as_json
    #head :bad_request
  end

end
