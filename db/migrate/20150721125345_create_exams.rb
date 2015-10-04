class CreateExams < ActiveRecord::Migration
  def change
    create_table :exams do |t|
      t.references :user, index: true, foreign_key: true
      t.references :questionnaire, index: true, foreign_key: true
      t.integer :items
      t.integer :focus, default: 1
      t.integer :correct_answer, default: 0
      t.string :mistake

      t.timestamps null: false
    end
  end
end
