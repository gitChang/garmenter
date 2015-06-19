class DisciplinesController < ApplicationController

  # GET /api/disciplines
  def index
    disciplines = Discipline.get_disciplines
    render json: disciplines
  end

end
