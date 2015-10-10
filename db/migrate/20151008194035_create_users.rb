class CreateUsers < ActiveRecord::Migration

  def up
    create_table :users do |t|
      t.references :branch, index: true, foreign_key: true

      t.string  :contact_person_first_name, null: false
      t.string  :contact_person_last_name,  null: false
      t.string  :contact_person_mobile,     null: false
      t.string  :contact_person_email,      null: false

      t.string  :account_name, null: false

      t.string  :crypted_password
      t.string  :salt

      t.boolean :approved,     default: false

      t.timestamps null: false
    end

    add_index :users, :contact_person_email, unique: true
    add_index :users, :account_name, unique: true
  end


  def down
    drop_table :users
  end

end
