class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.references :user, index: true, foreign_key: true
      t.references :discipline, index: true, foreign_key: true
      t.references :class_code, index: true, foreign_key: true
      t.text :question
      t.references :question_type, index: true, foreign_key: true
      t.integer :choices_len

      t.timestamps null: false
    end
  end
end
