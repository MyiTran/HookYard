module Authentication
  class RegistrationsController < Devise::RegistrationsController
    layout 'application'

    def create
      build_resource(sign_up_params)

      if resource.save
        resource.add_role(:support)
        sign_up(resource_name, resource)

        render json: { user: { id: resource.id, name: resource.name, email: resource.email, role: 'support' } }, status: :created
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    protected

    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end
