class BarcodeController < ApplicationController

  def cookie_barcode
    cookies[:barcode] = params[:barcode]
    render json: params[:barcode]
  end

end
