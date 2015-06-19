class CreateQuestionTypes < ActiveRecord::Migration
  def change
    create_table :question_types do |t|
      t.string :short_name
      t.string :long_name

      t.timestamps null: false
    end
  end
end
