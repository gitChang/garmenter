class ChoicesController < ApplicationController

  # POST /api/choices.json
  def create
    question = Question.find(params[:question_id])

    params[:choices].each do |c|
      choice = Choice.new(user: question.user, question: question, letter: c.first, value: c.last)
      unless choice.save
        render json: extract_first_error choice
      end
    end

    head :ok
  end

end
