# == Schema Information
#
# Table name: projects
#
#  id          :uuid             not null, primary key
#  description :text
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :uuid             not null
#
# Indexes
#
#  index_projects_on_owner_id  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#
class Project < ApplicationRecord
  belongs_to :owner, class_name: 'User'

  has_many :project_memberships, dependent: :destroy
  has_many :members, through: :project_memberships, source: :user
  has_many :project_invitations, dependent: :destroy

  validates :name, presence: true

  scope :accessible_by_user,
    ->(user) {
      left_joins(:project_memberships).where('projects.owner_id = :user_id OR project_memberships.user_id = :user_id', user_id: user.id).distinct
    }

  def accessible_by?(user)
    owner == user || members.exists?(user.id)
  end
end
