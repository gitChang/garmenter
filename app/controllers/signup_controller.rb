class SignupController < ApplicationController

  before_action :find_or_new_company,         only: :create
  before_action :find_or_new_company_branch,  only: :create

  before_action :create, only: :create_company
  before_action :create, only: :create_company_branch



  def find_or_new_company
    # get existing company record
    @company = Company.find_by_company_name(params[:company_name])

    return if @company

    # create new company record instead
    @company = Company.new(params_company)

    # halt. render error
    render json: @company.errors.first, status: 301 if @company.invalid?
  end



  def create_company
    @company.save if @company.new_record?
  end



  def find_or_new_company_branch
    # get existing company branch name record
    @branch = Branch.where(company: @company).find_by_branch_name(params[:branch_name])

    return if @branch

    # create new company branch name record instead
    @branch = Branch.new(params_branch)

    # halt. render error
    render json: @branch.errors.first, status: 301 if @branch.invalid?
  end



  def create_company_branch
    @branch.save if @branch.new_record?
  end



  def create
    sleep 1
    user = User.new(params_user)

    if user.save
      render json: true
    else
      render json: user.errors.first, status: 301
    end
  end



  private


    def params_company
      params.permit(:company_name)
    end



    def params_branch
      params.permit(:branch_name).merge(company: @company)
    end



    def params_user
      pu = params.permit(:contact_person_first_name,
                    :contact_person_last_name,

                    :contact_person_mobile,
                    :contact_person_email,

                    :account_name,
                    :password,
                    :confirm_password)

      pu.merge(branch: @branch)
    end

end
