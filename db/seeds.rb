# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# define callbacks

def seed_discipline
  disciplines = %w(English Mathematics Physics)
  disciplines.each { |d| Discipline.create(discipline: d) }

  puts "===> Seed Discipline Done."
end


def seed_question_types
  types = [
    {
      name: "single_answer",
      text: "Multiple Choice, Single Answer"
    },
    {
      name: "multiple_answers",
      text: "Multiple Choice, Multiple Answers"
    },
    {
      name: "fill_blanks",
      text: "Fill in the Blanks"
    },
    {
      name: "true_false",
      text: "True or False"
    }
  ]

  types.each { |t| QuestionType.create!(short_name: t[:name], long_name: t[:text]) }

  puts "===> Seed Question Types Done."
end


def seed_user
  User.create!(username: 'puchu2')
  puts "===> Seed User Done."
end


# callbacks

seed_discipline
seed_question_types
seed_user
