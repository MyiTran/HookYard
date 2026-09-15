class ProjectPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.admin? || record.accessible_by?(user)
  end

  def create?
    user.present?
  end

  def update?
    user.admin? || record.owner == user
  end

  def destroy?
    user.admin? || record.owner == user
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      return scope.all if user.admin?

      scope.accessible_by_user(user)
    end
  end
end
