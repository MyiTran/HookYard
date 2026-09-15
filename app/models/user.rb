# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  uid                    :string
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable

  # associations
  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id, dependent: :destroy, inverse_of: :owner
  has_many :project_memberships, dependent: :destroy, inverse_of: :user
  has_many :joined_projects, through: :project_memberships, source: :project
  has_many :sent_project_invitations, class_name: 'ProjectInvitation', foreign_key: :invited_by_id, dependent: :destroy, inverse_of: :invited_by
  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_limit: [200, 200]
  end

  # validations
  validates :name, presence: true
  validates :avatar,
    content_type: /\Aimage\/.*\z/,
    size: {
      less_than: 10.megabytes,
      message: I18n.t('activerecord.errors.models.user.attributes.avatar.size', size: 10)
    }

  def admin?
    has_role?(:admin)
  end

  def support?
    has_role?(:support)
  end
end
