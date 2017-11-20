class InvoicesController < ApplicationController
  before_action :init_invoice, only: [:create]

  def init_invoice
    @invoice = Invoice.new(user: current_user, invoice_barcode: params[:invoice_barcode])
  end

  def create
    sleep 1

    if @invoice.invalid?
      render json: @invoice.errors.first
    end
    render json: true if @invoice.save
  end

  def recent
    render json: Invoice.invoice_garments(current_user)
  end

  def recent_size
    render json: Invoice.invoice_garments(current_user).size
  end

  def history
    render json: Invoice.invoice_garments(current_user, false)
  end

  def history_size
    render json: Invoice.invoice_garments(current_user, false).size
  end

  def close_recent
    sleep 2
    close_invoices = Invoice.updatable
                            .where(user: current_user)
                            .update_all(closed: true)

    render json: true if close_invoices
  end

  def mark_delete
    sleep 1
    invoice = Invoice.where(invoice_barcode: params[:invoice_barcode]).first
    render json: true if Invoice.flag_deleted invoice
  end


  private

end
