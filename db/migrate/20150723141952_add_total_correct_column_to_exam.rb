class AddTotalCorrectColumnToExam < ActiveRecord::Migration
  def up
    add_column :exams, :total_correct, :integer, default: 0
  end

  def down
    remove_column :exams, :total_correct
  end
end
