class CreateCompanies < ActiveRecord::Migration

  def up
    create_table :companies do |t|
      t.string :company_name, unique: true, null: false
      t.boolean :deleted, default: false

      t.timestamps null: false
    end
  end


  def down
    drop_table :companies
  end

end
