module Admin
  class ProjectsController < BaseController
    def index
      projects = Project.includes(:owner, :project_memberships)
      return if request.format.html?

      render json: { projects: projects.map { |project| project_data(project) } }
    end

    def show
      project = Project.find(params[:id])
      return if request.format.html?

      render json: { project: project_data(project) }
    end

    private

    def project_data(project)
      {
        id: project.id,
        name: project.name,
        description: project.description,
        owner_name: project.owner.name,
        owner_email: project.owner.email,
        members_count: project.project_memberships.size
      }
    end
  end
end
