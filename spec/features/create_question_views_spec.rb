require 'rails_helper'

RSpec.feature "CreateQuestionViews", type: :feature do

  before(:each) do
  	visit '/create-question'
  end

  
  scenario 'when the user selects a discipline, the menu should appear.', 
  js: true do
    find('div.dropdown-discipline').click

    sleep 2

    expect(page).to have_css('div.dropdown-menue-discipline')
  end


  def select_discipline(discipline)
    find('div.dropdown-discipline').click
    find('div.dropdown-menue-discipline ul li', text: discipline).click
  end

  
  scenario 'the user selects a discipline.', 
  js: true do
    select_discipline 'English'

    sleep 2

    expect(page).to have_content('English')
  end


  scenario 'when the user done selecting a discipline, the `Add Class Code` button should appear', 
  js: true do
    select_discipline 'English'

    sleep 2

    expect(page).to have_css('button.save-class-code')
  end


  def add_new_class_code(discipline, code)
    select_discipline(discipline)
    fill_in('new_class_code', with: code)
    click_button 'Add Class Code'
  end


  scenario 'when a user added a new class code, it should be in the menu', 
  js: true do
    add_new_class_code 'English', 'Eng 101'

    sleep 3
    
    find('div.dropdown-class-code').click

    sleep 3
    
    expect(page).to have_content('Eng 101')
  end


  def select_class_code(code)
    find('div.dropdown-class-code').click
    find('div.dropdown-menue-class-code ul li', text: code).click
  end


  scenario 'when the user select a class code, the menu should appear.', 
  js: true do
  	select_discipline 'English'

    sleep 2

    add_new_class_code 'English', 'Eng 101'

    sleep 3

    find('div.dropdown-class-code').click

  	sleep 2

  	expect(page).to have_css('div.dropdown-menue-class-code')
  end


  scenario 'the user selects a class code.', 
  js: true do
    select_discipline 'English'
    add_new_class_code 'English', 'Eng 101'

    sleep 3

    select_class_code 'Eng 101'

    sleep 3

    expect(page).to have_content('Eng 101')
  end


  scenario 'the user changing discipline.', js: true do
    add_new_class_code 'English', 'Eng 101'
    
    sleep 3
    
    select_class_code 'Eng 101'
    
    sleep 2
    
    select_discipline 'Physics'
    
    sleep 3

    expect(page).to have_css('div.dropdown-class-code', text: 'Choose')
  end


  scenario 'user selects single choice question type', js: true do
    find('li.radio-item-qtype p', text: 'Multiple Choice, Single Answer').click
    sleep 2

    expect(page).to have_content('Number of Choices')
  end


  scenario 'user selects true or false question type', js: true do
    find('li.radio-item-qtype p', text: 'Multiple Choice, Single Answer').click
    sleep 2
    find('li.radio-item-qtype p', text: 'True or False').click
    sleep 2
    
    expect(page).to_not have_content('Number of Choices')
  end


  def select_number_of_choices(len)
    find('div.dropdown-choice-len').click
    find('div.dropdown-menue-choice-len ul li', text: len).click
  end


  def select_question_type(type)
    find('li.radio-item-qtype p', text: type).click
  end


  def select_answers(qtype)
    if qtype == "fill_blanks"
      #todo
    else
      first('li span.pick-answer').click
    end
  end


  scenario 'user selects length of choice items', js: true do
    select_question_type 'Multiple Choice, Single Answer'
    sleep 2
    select_number_of_choices '3'
    sleep 2

    expect( find( '.choices ul' ) ).to have_selector( 'li', count: 3 )
  end


  scenario 'when the user select an answer, the `Save Question` should appear.', 
  js: true do
    select_question_type 'Multiple Choice, Single Answer'
    sleep 2
    select_number_of_choices '3'
    sleep 2
    select_answers 'single_answer'
    sleep 2

    expect(page).to have_content('Save Question')
  end


  scenario 'when the user deselect her answer, the `Save Question` should disappear.', 
  js: true do
    select_question_type 'Multiple Choice, Multiple Answer'
    sleep 2
    select_number_of_choices '2'
    sleep 2
    select_answers 'multiple_answers'
    sleep 2
    select_answers 'multiple_answers'

    expect(page).to_not have_content('Save Question')
  end


  def save_question
    click_button 'Save Question'
  end


  def fill_up_choices(len)
    (0..(len - 1)).each do |i|
      element_str = "input.form-control#choice_#{i}"
      sleep 2
      find(element_str).set (0...8).map { (65 + rand(26)).chr }.join
    end
  end


  scenario 'when all choices are filled, error alert should not be displayed.', js: true do
    select_question_type 'Multiple Choice, Single Answer'
    
    sleep 2
    
    select_number_of_choices '2'
    
    sleep 2
    
    select_answers 'single_answer'
    
    sleep 2

    save_question

    sleep 3

    fill_up_choices 2

    sleep 2

    save_question

    sleep 3

    expect(page).to_not have_content('Please provide all the choices below.')
  end

end
