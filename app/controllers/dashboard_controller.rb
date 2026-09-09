class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    redirect_to admin_root_path if current_user.has_role?(:admin)
  end
end
