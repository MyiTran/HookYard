module Authentication
  class SessionsController < Devise::SessionsController
    def create
      self.resource = warden.authenticate(auth_options)

      unless resource
        render json: { error: 'Email or password is incorrect!' }, status: :unauthorized
        return
      end

      sign_in(resource_name, resource)
      render json: { user: user_data(resource) }
    end

    def destroy
      sign_out(resource_name)
      render json: { message: 'Signed out successfully!' }
    end

    def current
      unless user_signed_in?
        render json: { error: 'You need to sign in!' }, status: :unauthorized
        return
      end

      render json: { user: user_data(current_user) }
    end

    private

    def user_data(user)
      { id: user.id, name: user.name, email: user.email, role: user.admin? ? 'admin' : 'support' }
    end
  end
end
