class CreateSkipQuestions < ActiveRecord::Migration

  def up
    create_table :skip_questions do |t|
      t.references :user, index: true
      t.references :question
      t.integer :item_no

      t.timestamps null: false
    end
  end

  def down
    drop_table :skip_questions
  end

end
