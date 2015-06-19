class ClassCode < ActiveRecord::Base
  
  belongs_to :discipline
  belongs_to :user


  has_many :questions

  
  before_validation :set_discipline
  before_validation :set_user


  attr_accessor :data_discipline, :data_user

  
  validates :data_discipline,
    presence: { message: 'Requires a discipline.' }

  validates :discipline, 
    presence: { message: 'Requires a discipline.' }

  validates :code, 
    presence: { message: 'Please provide a class code.' },
    length: { 
      maximum: 8, 
      message: 'Exceeds the maximum length of characters.' 
    }


  def self.fetch_with_discipline(param_discipline)
    class_codes = Array.new
    discipline = Discipline.find_by_name(param_discipline)

    discipline.class_codes.each { |cc| class_codes <<  cc.code }
    
    return class_codes
  end


  private


    def set_discipline
      self.discipline = Discipline.where(name: data_discipline).first
    end

    def set_user
      self.user = User.where(username: data_user).first
    end
end
