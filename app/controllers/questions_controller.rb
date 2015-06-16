class QuestionsController < ApplicationController

  # POST /question
  def create
    sleep 2
    render json: params.as_json
  end

end
