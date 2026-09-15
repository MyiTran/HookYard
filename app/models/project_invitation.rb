# == Schema Information
#
# Table name: project_invitations
#
#  id            :uuid             not null, primary key
#  email         :string           not null
#  role          :string           default("maintainer"), not null
#  status        :string           default("pending"), not null
#  token         :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  invited_by_id :uuid             not null
#  project_id    :uuid             not null
#
# Indexes
#
#  index_project_invitations_on_invited_by_id         (invited_by_id)
#  index_project_invitations_on_project_id            (project_id)
#  index_project_invitations_on_project_id_and_email  (project_id,email) UNIQUE
#  index_project_invitations_on_token                 (token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (invited_by_id => users.id)
#  fk_rails_...  (project_id => projects.id)
#
class ProjectInvitation < ApplicationRecord
  belongs_to :project
  belongs_to :invited_by, class_name: 'User'

  enum :role, { maintainer: 'maintainer' }, default: 'maintainer'
  enum :status, { pending: 'pending', accepted: 'accepted', declined: 'declined' }, default: 'pending'

  before_validation :set_token, on: :create

  validates :email, presence: true, uniqueness: { scope: :project_id }

  private

  def set_token
    self.token ||= SecureRandom.hex(20)
  end
end
