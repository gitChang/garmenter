class Discipline < ActiveRecord::Base
  
  has_many :class_codes
  has_many :questions
  
  validates :name, presence: true


  def self.get_disciplines
    disciplines = Array.new

    select(:name).each do |d|
      disciplines << d.name
    end

    return disciplines
  end

end
