class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices do |t|
      t.references :user, index: true, foreign_key: true
      t.references :question, index: true, foreign_key: true
      t.string :letter
      t.text :value

      t.timestamps null: false
    end
  end
end
