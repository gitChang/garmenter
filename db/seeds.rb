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
      abbrev: "mcsa",
      name: "Multiple Choice, Single Answer"
    },
    {
      abbrev: "mcma",
      name: "Multiple Choice, Multiple Answers"
    },
    {
      abbrev: "fnb",
      name: "Fill in the Blanks"
    },
    {
      abbrev: "tof",
      name: "True or False"
    }
  ]

  types.each { |t| QuestionType.create!(abbrev: t[:abbrev], name: t[:name]) }

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
