class DisciplinesController < ApplicationController

  # GET /api/disciplines
  def index
    disciplines = %w(English Mathematics Physics)
    render json: disciplines
  end

end
