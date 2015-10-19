class GarmentsController < ApplicationController
  before_action :init_garment, only: :create


  def init_garment
    invoice = Invoice.updatable.where(invoice_barcode: params[:invoice_barcode]).first
    @garment = Garment.new(invoice: invoice, garment_barcode: params[:garment_barcode])
  end

  def create
    sleep 1

    if @garment.invalid?
      render json: @garment.errors.first
    end
    render json: true if @garment.save
  end

  def quantity
    invoice = Invoice.updatable.where(invoice_barcode: params[:invoice_barcode]).first
    size = Garment.active.where(invoice: invoice).size
    render json: size
  end

  def destroy
    sleep 1
    garment = Garment.find_by_garment_barcode(params[:garment_barcode])
    render json: true if garment.destroy
  end

end
