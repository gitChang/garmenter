class ClassCode < ActiveRecord::Base

  belongs_to :discipline
  belongs_to :user


  has_many :questions


  before_validation :set_params_to_attributes

  attr_accessor :question_discipline, :question_class_code


  validates :discipline,
            :presence => { message: 'Requires a discipline.' }

  validates :class_code,
            :presence => { message: 'Please provide a class code.' },
            :length   => { maximum: 8, message: 'Exceeds the maximum length of characters.' }


  def self.fetch_with_discipline(param_discipline)
    arr_class_codes = Array.new

    obj_discipline = Discipline.find_by_discipline(param_discipline)

    obj_discipline.class_codes.each { |cc| arr_class_codes <<  cc.class_code }

    return arr_class_codes
  end


  private


    def set_params_to_attributes
      self.user = User.first

      self.discipline = Discipline.find_by_discipline(question_discipline)

      self.class_code = question_class_code
    end
end
