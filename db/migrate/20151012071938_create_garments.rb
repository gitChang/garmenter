class CreateGarments < ActiveRecord::Migration

  def up
    create_table :garments do |t|
      t.references :invoice, index: true, foreign_key: true

      t.string :garment_barcode, null: false

      t.timestamps null: false
    end
  end
end
