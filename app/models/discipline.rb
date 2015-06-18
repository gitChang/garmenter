class Discipline < ActiveRecord::Base
  
  has_many :class_codes
  
  validates :name, presence: true
end
