class User < ActiveRecord::Base

  belongs_to :branch


  attr_accessor :confirm_password



  NAME_REGEX   = /\A[a-zA-Z ]+\z/
  MOBILE_REGEX = /\A[0-9 -]+\z/
  EMAIL_REGEX  = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  ACCT_REGEX   = /\A[a-zA-Z_]+\z/


  validates :contact_person_first_name,
              presence: { message: 'Please provide Contact Person\'s First Name.' },
              format:   { with: NAME_REGEX, message: 'Names only allow letters.' },
              length:   { within: 2..20, message: 'Names only accept 2 to 20 characters.' }


  validates :contact_person_last_name,
              presence: { message: 'Please provide Contact Person\'s Last Name.' },
              format:   { with: NAME_REGEX, message: 'Names only allow letters.' },
              length:   { within: 2..20, message: 'Names only accept 2 to 20 characters.' }


  validates :contact_person_mobile,
              presence: { message: 'Please provide Contact Person\'s Mobile Number.' },
              format:   { with: MOBILE_REGEX, message: 'Mobile Number only accepts numeric characters.' },
              length:   { within: 6..15, message: 'A minimum of 6 and a maximum of 15 numbers for Mobile Number.' }


  validates :contact_person_email,
              presence: { message: 'Please provide Contact Person\'s Email.' },
              format:   { with: EMAIL_REGEX, message: 'Invalid email address format.' }


  validates :account_name,
              presence: { message: 'Please provide an Account Name.' },
              format:   { with: ACCT_REGEX, message: 'Account Name is only limited to letters and underscore.' },
              length:   { within: 6..12, message: 'A min. of 6 and a max. of 12 characters for Account Name.' }


  validates :password,
              presence: { message: 'Please provide a Password.' },
              length:   { within: 6..12, message: 'A min. of 6 and a max. of 12 characters for Password.' }


  validates :confirm_password,
              presence: { message: 'Please confirm your Password.' },
              on: :create


  validate  :compare_passwords, if: 'password.present?'



  private


    def compare_passwords
      if password != confirm_password
        errors.add(:confirm_password, 'Your password does not match.')
      end
    end


    def propercase_name
      self.contact_person_first_name = contact_person_first_name.titlecase
      self.contact_person_last_name = contact_person_last_name.titlecase
    end

end
