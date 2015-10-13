class InvoicesController < ApplicationController

  before_action :new,         only: [:create]
  before_action :new_garment, only: [:create_garments]


  def new
    @invoice = Invoice.new(params[:invoice_number])
    if @invoice.valid?
      render json: true
    else
      render json: @invoice.errors.first, status: 301
    end
  end


  def new_garment
    @garment ||= params[:garment_number]

    garment = Garment.new(garment_barcode: @garment)
    if garment.valid?
      render json: true
    else
      render json: garment.errors.first, status: 301
    end
  end


  def create_garments
    params[:garment_barcodes].each do |garment|
      @garment = garment

      new_garment = Garment.new(invoice: @invoice, garment_barcode: @garment)

      unless new_garment.save
        render json: new_garment.errors.first, status: 301
      end
    end
  end


  def create
    invoice = Invoice.create(invoice_barcode: params[:invoice_number])
    if invoice.save
      render json: true
    else
      render json: false, status: 301
    end
  end
end
