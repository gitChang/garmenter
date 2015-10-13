class CreateInvoices < ActiveRecord::Migration

  def up
    create_table :invoices do |t|
      t.references :user , index: true, foreign_key: true

      t.string :invoice_barcode, index: true, null: false


      t.timestamps null: false
    end
  end


  def down
    drop_table :invoices
  end
end
