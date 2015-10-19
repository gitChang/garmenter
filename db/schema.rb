# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151018182243) do

  create_table "branches", force: :cascade do |t|
    t.integer  "company_id"
    t.string   "branch_name",                 null: false
    t.boolean  "deleted",     default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "branches", ["company_id"], name: "index_branches_on_company_id"

  create_table "companies", force: :cascade do |t|
    t.string   "company_name",                 null: false
    t.boolean  "deleted",      default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "garments", force: :cascade do |t|
    t.integer  "invoice_id"
    t.string   "garment_barcode",                 null: false
    t.boolean  "deleted",         default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "garments", ["deleted"], name: "index_garments_on_deleted"
  add_index "garments", ["garment_barcode"], name: "index_garments_on_garment_barcode"
  add_index "garments", ["invoice_id"], name: "index_garments_on_invoice_id"

  create_table "invoices", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "invoice_barcode",                 null: false
    t.boolean  "closed",          default: false
    t.boolean  "deleted",         default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "invoices", ["closed"], name: "index_invoices_on_closed"
  add_index "invoices", ["deleted"], name: "index_invoices_on_deleted"
  add_index "invoices", ["invoice_barcode"], name: "index_invoices_on_invoice_barcode"
  add_index "invoices", ["user_id"], name: "index_invoices_on_user_id"

  create_table "users", force: :cascade do |t|
    t.integer  "branch_id"
    t.string   "contact_person_first_name",                       null: false
    t.string   "contact_person_last_name",                        null: false
    t.string   "contact_person_mobile",                           null: false
    t.string   "contact_person_email",                            null: false
    t.string   "account_name",                                    null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.boolean  "approved",                        default: false
    t.boolean  "deleted",                         default: false
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
  end

  add_index "users", ["account_name"], name: "index_users_on_account_name", unique: true
  add_index "users", ["branch_id"], name: "index_users_on_branch_id"
  add_index "users", ["contact_person_email"], name: "index_users_on_contact_person_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token"

end
