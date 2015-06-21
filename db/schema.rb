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

ActiveRecord::Schema.define(version: 20150618110528) do

  create_table "answers", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "question_id"
    t.string   "answer"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id"
  add_index "answers", ["user_id"], name: "index_answers_on_user_id"

  create_table "choices", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "question_id"
    t.string   "letter"
    t.text     "value"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "choices", ["question_id"], name: "index_choices_on_question_id"
  add_index "choices", ["user_id"], name: "index_choices_on_user_id"

  create_table "class_codes", force: :cascade do |t|
    t.integer  "discipline_id"
    t.integer  "user_id"
    t.string   "class_code",          limit: 8
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "class_codes", ["discipline_id"], name: "index_class_codes_on_discipline_id"
  add_index "class_codes", ["user_id"], name: "index_class_codes_on_user_id"

  create_table "disciplines", force: :cascade do |t|
    t.string   "discipline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "question_types", force: :cascade do |t|
    t.string   "short_name"
    t.string   "long_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "discipline_id"
    t.integer  "class_code_id"
    t.text     "question"
    t.integer  "question_type_id"
    t.integer  "choices_len"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "questions", ["class_code_id"], name: "index_questions_on_class_code_id"
  add_index "questions", ["discipline_id"], name: "index_questions_on_discipline_id"
  add_index "questions", ["question_type_id"], name: "index_questions_on_question_type_id"
  add_index "questions", ["user_id"], name: "index_questions_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "username",   limit: 30
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
