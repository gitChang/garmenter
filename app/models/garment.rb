class Garment < ActiveRecord::Base

  belongs_to :invoice


  ALPHANUM_REGEX = /\A[0-9a-zA-Z]+\z/


  validates :invoice,
      presence: { message: 'Please specify the invoice of this items.' }

  validates :garment_barcode,
      presence: { message: 'Item Barcode cannot be empty.' },
      length:   { within: 6..20, message: 'Barcodes only accept 2 to 20 characters.' },
      format:   { with: ALPHANUM_REGEX, message: 'Barcodes cannot contain special characters.' }

  validate  :unique_barcode, on: :create # to avoid "exists" validation.


  scope :active, -> { where(deleted: false) }
  scope :sort_asc, -> { active.order(:created_at) }
  scope :sort_desc, -> { active.order(created_at: :desc) }


  private

  def unique_barcode
    invoice = Invoice.active.where(invoice_barcode: garment_barcode).present?
    garment = Garment.active.where(garment_barcode: garment_barcode).present?

    if invoice || garment
      errors.add(:garment_barcode, 'Barcode already exists.')
    end
  end

end
