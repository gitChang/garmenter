class CreateUsers < ActiveRecord::Migration

  def up
    create_table :users do |t|
      t.references :branch, index: true, foreign_key: true

      t.string  :contact_person_first_name, null: false
      t.string  :contact_person_last_name,  null: false
      t.string  :contact_person_mobile,     null: false
      t.string  :contact_person_email,      null: false

      t.string  :account_name, null: false
      t.string  :password,     null: false
      t.boolean :approved,     default: false

      t.timestamps null: false
    end
  end


  def down
    drop_table :users
  end

end
