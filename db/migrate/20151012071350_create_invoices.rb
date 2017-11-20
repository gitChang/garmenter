class CreateInvoices < ActiveRecord::Migration

  def up
    create_table :invoices do |t|
      t.references :user , index: true, foreign_key: true

      t.string :invoice_barcode, unique: true, null: false, index: true
      t.boolean :closed, default: false, index: true
      t.boolean :deleted, default: false, index: true

      t.timestamps null: false
    end
  end

  def down
    drop_table :invoices
  end

end
