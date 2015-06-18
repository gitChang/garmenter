class User < ActiveRecord::Base

  has_many :class_codes
  
  validates :username, presence: true
end
