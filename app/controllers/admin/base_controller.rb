module Admin
  class BaseController < ApplicationController
    layout 'admin'

    before_action :authenticate_user!
    before_action :authorize_admin!

    private

    def authorize_admin!
      return if current_user.has_role?(:admin)

      redirect_to root_path, alert: 'You are not authorized to access this page!'
    end
  end
end
