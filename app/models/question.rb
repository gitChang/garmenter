class Question < ActiveRecord::Base

  belongs_to :user
  belongs_to :discipline
  belongs_to :class_code
  belongs_to :question_type

  has_many :choices
  has_many :answers

  before_validation :set_params_to_attributes

  after_save :create_choices_to_question
  after_save :create_answers_to_question

  # virtual attributes.
  attr_accessor :question_discipline, :question_class_code, :question_question,
                :question_question_type, :question_choices_len, :question_choices,
                :question_answers

  # real attributes and validations.
  validates :discipline,
            :presence => { message: 'Requires a discipline' }

  validates :class_code,
            :presence => { message: 'Requires a class code.' }

  validates :question,
            :presence => { message: 'Please provide a question.' }

  validates :question_type,
            :presence => { message: 'Requires a question type.' }

  validates :choices_len,
            :presence => { message: 'Provide a choices length.' }

  validate  :choices_param

  validate  :answers_param

  # public methods

  def self.get_all
    arr_questions = Array.new

    all.each do |q|
      h = Hash.new

      h[:id]           = q.id
      h[:class_code]   = q.class_code.class_code
      h[:question]     = q.question
      h[:date_updated] = q.updated_at

      arr_questions << h
    end

    return arr_questions
  end

  # call upon show action.
  def self.get(param)
    hash_question = Hash.new
    hash_choices  = Hash.new
    arr_answers   = Array.new
    question      = Question.find(param)

    hash_question[:question] = question.question
    hash_question[:type]     = question.question_type.short_name

    question.choices.each do |qc|
      hash_choices[qc.letter] = qc.value
    end

    hash_question[:choices] = hash_choices

    question.answers.each do |qa|
      arr_answers << qa.answer
    end

    hash_question[:answers] = arr_answers

    return hash_question
  end

  private

  # before_validation callbacks

  def set_params_to_attributes
    self.user = User.first

    self.discipline = Discipline.find_by_discipline(question_discipline)

    self.class_code = ClassCode.find_by_class_code(question_class_code)

    self.question = question_question

    self.question_type = QuestionType.find_by_short_name(question_question_type)

    self.choices_len = question_choices_len.to_i
  end

  # validates choices parameter.
  def choices_param
    error_message = 'Please fill all choices below.'

    unless question_choices.size == question_choices_len.to_i
      errors.add(:choices, error_message)
      return
    end

    question_choices.each do |choice|
      unless choice.last.present?
        errors.add(:choices, error_message)
        return
      end
    end
  end

  # validates answers parameter.
  def answers_param
    error_message = 'Please provide the answer/s.'

    unless question_answers
      errors.add(:answers, error_message)
      return
    end

    case question_type
    when 'multiple_answers'
    when 'fill_blanks'
      unless question_answers.size < 2
        errors.add(:answers, error_message)
      end
    when 'true_false'
      unless ['True', 'False'].include(question_answers.first)
        errors.add(:answers, 'Invalid boolean answer.')
        return
      end
    end
  end

  # after_save callbacks

  def create_choices_to_question
    question_choices.each do |choice|
      Choice.create(user: user, question: self, letter: choice.first, value: choice.last)
    end
  end

  def create_answers_to_question
    question_answers.each do |answer|
      Answer.create(user: user, question: self, answer: answer)
    end
  end

end
