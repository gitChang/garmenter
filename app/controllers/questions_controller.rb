class QuestionsController < ApplicationController

  # GET /api/questions.json
  def index
    render json: Question.get_all
  end

  # POST /api/questions.json
  def create
    new_question = Question.new(permitted_params)

    if new_question.save
      head :ok
    else
      render json: get_first_error(new_question.errors), status: :not_acceptable
    end
  end

  # GET /api/question/1.json
  def show
    question = Question.get(params[:id])

    if question
      render json: question
    else
      head :not_found
    end
  end

  private

    # payload from client.
    def permitted_params
      params.permit(
        :discipline,
        :class_code,
        :question,
        :question_type,
        :choices_len,
        :question_discipline,
        :question_class_code,
        :question_question_type,
        :question_question,
        :question_choices_len,
        :question_choices => [
          :A,
          :B,
          :C,
          :D
        ],
        :question_answers => []
      )
    end
end
