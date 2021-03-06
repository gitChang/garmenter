class CreateBranches < ActiveRecord::Migration

  def up
    create_table :branches do |t|
      t.references :company, index: true, foreign_key: true

      t.string :branch_name, unique: true, null: false
      t.boolean :deleted, default: false

      t.timestamps null: false
    end
  end


  def down
    drop_table :branches
  end

end
