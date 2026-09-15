class ProjectsController < ApplicationController
  def index
    projects = policy_scope(Project)
    return if request.format.html?

    render json: { projects: projects.map { |project| project_data(project) } }
  end

  def show
    project = Project.find(params[:id])
    authorize project
    return if request.format.html?

    render json: { project: project_data(project) }
  end

  def create
    project = current_user.owned_projects.new(project_params)
    authorize project

    if project.save
      render json: { project: project_data(project) }, status: :created
    else
      render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    project = Project.find(params[:id])
    authorize project

    if project.update(project_params)
      render json: { project: project_data(project) }
    else
      render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    project = Project.find(params[:id])
    authorize project
    project.destroy!
    head :no_content
  end

  private

  def project_params
    params.require(:project).permit(:name, :description)
  end

  def project_data(project)
    {
      id: project.id,
      name: project.name,
      description: project.description,
      owner: project.owner_id == current_user.id,
      members_count: project.project_memberships.count
    }
  end
end
