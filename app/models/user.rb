class User < ActiveRecord::Base

  has_many :class_codes
  has_many :questions
  has_many :choices
  has_many :answers
  
  validates :username, presence: true
end
