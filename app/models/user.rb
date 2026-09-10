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
#  tenant_id              :uuid
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_tenant_id             (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
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
  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_limit: [200, 200]
  end
  belongs_to :tenant, optional: true

  # validations
  validates :avatar,
    content_type: /\Aimage\/.*\z/,
    size: {
      less_than: 10.megabytes,
      message: I18n.t('activerecord.errors.models.user.attributes.avatar.size', size: 10)
    }
  validate :validate_tenant

  def admin?
    has_role?(:admin)
  end

  def support?
    has_role?(:support)
  end

  def employee?
    !admin? && has_role?(:employee)
  end

  private

  def validate_tenant
    errors.add(:tenant, 'must be empty for admin') if admin? && tenant.present?
    errors.add(:tenant, 'must exist for support') if support? && tenant.blank?
  end
end
