class Discipline < ActiveRecord::Base

  has_many :class_codes
  has_many :questions

  validates :discipline, presence: true


  def self.get_disciplines
    disciplines = Array.new

    select(:discipline).each do |d|
      disciplines << d.discipline
    end

    return disciplines
  end

end
