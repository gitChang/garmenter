class QuestionType < ActiveRecord::Base

  has_many :questions


  def self.get_names
    names = Array.new

    select(:short_name, :long_name).each do |qt|
      names << { name: qt.short_name, text: qt.long_name }
    end

    names
  end

end
