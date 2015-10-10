class Branch < ActiveRecord::Base

  belongs_to :company
  has_many :users


  ALPHANUM_REGEX = /\A[0-9a-zA-Z -]+\z/


  validates :branch_name,
      presence: { message: 'Please provide your Branch Name.' },
      format:   { with: ALPHANUM_REGEX, message: 'Branch Name cannot contain special characters.' },
      length:   { within: 2..20, message: 'Branch Name must be a min. of 2 and max of 20 characters.' }


  validate  :unique_branch_per_company



  private


    def unique_branch_per_company
      unless Branch.where(company: company).find_by_branch_name(branch_name).nil?
        errors.add(:branch_name, 'Branch Name already exists for this company.')
      end
    end

end
