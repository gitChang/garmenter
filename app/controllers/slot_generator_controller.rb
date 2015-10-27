class SlotGeneratorController < ApplicationController

  def next_garment_slot
    @garment = Garment.active.where(garment_barcode: params[:garment_barcode]).first
    render json: invoice_payload
  end

  private

  def invoice_payload
    invoice = @garment ? @garment.invoice : nil

    if !invoice || !invoice.closed
      return { error: 'Invoice not found or needs to be synced first.' }
    end

    item = { invoice_id: nil, invoice_barcode: nil, garment_barcodes: nil }

    item[:invoice_id] = invoice.id
    item[:invoice_barcode] = invoice.invoice_barcode
    item[:garment_barcodes] = invoice.garments.collect { |g| g.garment_barcode }

    item
  end

end
