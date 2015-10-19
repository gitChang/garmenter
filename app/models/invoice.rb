class Invoice < ActiveRecord::Base

  belongs_to :user
  has_many :garments

  ALPHANUM_REGEX = /\A[0-9a-zA-Z]+\z/

  validates :invoice_barcode,
    presence: { message: 'Invoice Barcode cannot be empty.' },
    length:   { within: 6..20, message: 'Barcodes only accept 2 to 20 characters.' },
    format:   { with: ALPHANUM_REGEX, message: 'Barcodes cannot contain special characters.' }

  validate  :unique_barcode


  scope :active, -> { where(deleted: false) }
  scope :sort_asc, -> { active.order(:created_at) }
  scope :sort_desc, -> { active.order(created_at: :desc) }
  scope :updatable, -> { sort_asc.where(closed: false) }
  scope :closed, -> {sort_asc.where(closed: true) }


  def self.invoice_garments(current_user, updatable_flag=true)
    # collect all either
    # updatable or closed
    # invoices.
    if updatable_flag
      array_invoices = Invoice.updatable.where(user: current_user).to_a
    else
      array_invoices = Invoice.closed.where(user: current_user).to_a
    end
    # collect all garments
    # unders these invoices.
    json_garments = Garment.active.where(invoice: array_invoices).as_json

    # since join is slow,
    # will make key insertion here.
    json_invoices = array_invoices.collect do |invoice|
                      {
                        'id' => invoice.id,
                        'invoice_barcode' => invoice.invoice_barcode,
                        'garment_barcodes' => [],
                        'date_scanned' => invoice.created_at
                      }
                    end
    # fill garment barcode
    # collection here.
    json_invoices.each do |invoice|
      json_garments.each do |garment|
        if garment['invoice_id'] == invoice['id']
          invoice['garment_barcodes'] << garment['garment_barcode']
        end
      end
    end
    return json_invoices
  end

  # mark as only deleted.
  # prevent actual deletion.
  def self.flag_deleted(instance)
    self.flag_garments_deleted instance
    instance.update_attribute(:deleted, true)
    true
  end

  # mark dependent garments
  # as only deleted. prevent
  # actual deletion.
  def self.flag_garments_deleted(instance)
    instance.garments.update_all(deleted: true)
  end


  private

  def unique_barcode
    invoice = Invoice.active.where(invoice_barcode: invoice_barcode).present?
    garment = Garment.active.where(garment_barcode: invoice_barcode).present?
    if invoice || garment
      errors.add(:invoice_barcode, 'Barcode already exists.')
    end
  end

end
