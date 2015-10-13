class Invoice < ActiveRecord::Base

  belongs_to :user

  has_many :garments


  ALPHANUM_REGEX = /\A[0-9a-zA-Z]+\z/


  validates :invoice_barcode,
    presence: { message: 'Item Barcode cannot be empty.' },
    length:   { within: 6..20, message: 'Barcodes only accept 2 to 20 characters.' },
    format:   { with: ALPHANUM_REGEX, message: 'Barcodes cannot contain special characters.' }

end
