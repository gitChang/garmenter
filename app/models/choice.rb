class Choice < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :question


  validates :user,
            :presence => true
            
  validates :question,
            :presence => true

  validates :letter,
            :presence => true

  validates :value,
            :presence => true
end
