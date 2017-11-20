class Company < ActiveRecord::Base

  has_many :branches

  ALPHANUM_REGEX = /\A[0-9a-zA-Z -]+\z/

  validates :company_name,
      presence: { message: 'Please provide your Company Name.' },
      format:   { with: ALPHANUM_REGEX, message: 'Company Name cannot contain special characters.' },
      length:   { within: 2..20, message: 'Company Name must be a min. of 2 and max of 20 characters.' },
      uniqueness: { case_sensitive: false, message: 'Company Name already exists. Enter a different company name.' }


  scope :active, -> { where(deleted: false) }

  # mark as only deleted.
  # prevent actual deletion.
  def self.flag_deleted(instance)
    self.flag_branches_deleted instance
    instance.update_attribute(:deleted, true)
  end

  # mark dependent garments
  # as only deleted. prevent
  # actual deletion.
  def self.flag_branches_deleted(instance)
    # get branch ids for users
    branche_ids = instance.branches.collect { |b| id }
    # set as deleted users
    # under these branches.
    self.flag_users_deleted(branche_ids)
    # set branch as deleted
    instance.branches.update_all(deleted: true)
  end

  def self.flag_users_deleted(branches_ids)
    branches_ids.each do |bid|
      user = User.active.where(branch_id: bid)
      user.update_attribute(:deleted, true)
    end
  end

end
