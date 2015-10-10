class Company < ActiveRecord::Base

  has_many :branches


  ALPHANUM_REGEX = /\A[0-9a-zA-Z -]+\z/


  validates :company_name,
      presence: { message: 'Please provide your Company Name.' },
      format:   { with: ALPHANUM_REGEX, message: 'Company Name cannot contain special characters.' },
      length:   { within: 2..20, message: 'Company Name must be a min. of 2 and max of 20 characters.' }

end
