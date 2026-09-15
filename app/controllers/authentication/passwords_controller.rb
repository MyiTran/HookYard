module Authentication
  class PasswordsController < Devise::PasswordsController
    def create
      self.resource = resource_class.send_reset_password_instructions(resource_params)

      render json: { message: 'If the email exists, password reset instructions have been sent!' }
    end

    def update
      self.resource = resource_class.reset_password_by_token(resource_params)

      if resource.errors.empty?
        render json: { message: 'Password updated successfully!' }
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
