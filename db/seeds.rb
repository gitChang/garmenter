# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# DEFINE
def seed_user
  test_company_name = Company.new(company_name: 'Test Company')
  test_company_name.save

  test_branch = Branch.new(company: test_company_name, branch_name: 'Test Branch')
  test_branch.save

  user = User.new
  user.branch = test_branch
  user.contact_person_first_name = 'Test First Name'
  user.contact_person_last_name = 'Test Last Name'
  user.contact_person_mobile = '09265405954'
  user.contact_person_email = 'test@email.com'

  user.account_name = 'puta_atup'
  user.password = 'password'
  user.password_confirmation = 'password'

  user.approved = true

  user.save

  puts "===> Seed User Done."
end

# EXECS
seed_user
