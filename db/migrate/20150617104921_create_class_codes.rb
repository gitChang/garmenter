class CreateClassCodes < ActiveRecord::Migration
  def change
    create_table :class_codes do |t|
      t.references :discipline, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.string :code, limit: 8

      t.timestamps null: false
    end
  end
end
