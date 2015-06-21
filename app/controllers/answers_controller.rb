class AnswersController < ApplicationController

  # POST /api/answers.json
  def create
    question = Question.find(params[:question_id])

    params[:answers].each do |a|
      answer = Answer.new(user: question.user, question: question, answer: a)
      unless answer.save
        render json: extract_first_error answer
      end
    end

    head :ok
  end

end
