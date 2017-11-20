class CreateGarments < ActiveRecord::Migration

  def up
    create_table :garments do |t|
      t.references :invoice, index: true, foreign_key: true

      t.string :garment_barcode, unique: true, null: false, index: true
      t.boolean :deleted, default: false, index: true

      t.timestamps null: false
    end
  end

  def down
    drop_table :garments
  end

end
