class Question < ActiveRecord::Base
  belongs_to :user
  belongs_to :discipline
  belongs_to :class_code
  belongs_to :question_type
end
