class QuestionTypesController < ApplicationController

  def index
    question_types = QuestionType.get_names
    render json: question_types
  end

end
