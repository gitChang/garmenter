class User < ActiveRecord::Base

  authenticates_with_sorcery!

  belongs_to :branch
  has_many :invoices, dependent: :destroy

  attr_accessor :password_confirmation

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
      length:   { within: 6..15, message: 'A minimum of 6 and a maximum of 15 numbers for Mobile Number.' },
      uniqueness: { case_sensitive: false, message: 'Mobile Number already exists. Enter a different mobile number.' }

  validates :contact_person_email,
      presence:   { message: 'Please provide Contact Person\'s Email.' },
      format:     { with: EMAIL_REGEX, message: 'Invalid email address format.' },
      length:     { within: 6..25, message: 'A minimum of 6 and a maximum of 25 characters for Email Address.' },
      uniqueness: { case_sensitive: false, message: 'Email Address already exists. Enter a different email address.' }

  validates :account_name,
      presence:   { message: 'Please provide an Account Name.' },
      format:     { with: ACCT_REGEX, message: 'Account Name is only limited to letters and underscore.' },
      length:     { within: 6..15, message: 'A min. of 6 and a max. of 15 characters for Account Name.' },
      uniqueness: { case_sensitive: false, message: 'Account Name is already in use. Enter a different account name.' }

  validates :password,
      presence:     { message: 'Please provide a Password.' },
      length:       { within: 6..12, message: 'A min. of 6 and a max. of 12 characters for Password.' },
                    if: -> { new_record? || changes["password"] }

  validate  :compare_passwords, if: 'password.present?'

  validates :password,
      confirmation: { message: 'Please confirm your Password.' },
                    if: -> { new_record? || changes["password"] }

  validates :password_confirmation,
      presence: { message: 'Please confirm your Password.' },
      if: -> { new_record? || changes["password"] }


  private

    def compare_passwords
      return unless password_confirmation.present?
      if password != password_confirmation
        errors.add(:password_confirmation, 'Your password does not match.')
      end
    end


    def propercase_name
      self.contact_person_first_name = contact_person_first_name.titlecase
      self.contact_person_last_name = contact_person_last_name.titlecase
    end

end
