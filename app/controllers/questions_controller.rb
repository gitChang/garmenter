class QuestionsController < ApplicationController

  # POST /question.json
  def create
    sleep 2
    render json: params.as_json
  end


  # POST /add_new_class_code_questions.json
  # add new class code.
  def add_new_class_code
    sleep 2
    render json: params.as_json
  end
end
