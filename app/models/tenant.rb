# == Schema Information
#
# Table name: tenants
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tenants_on_slug  (slug) UNIQUE
#
class Tenant < ApplicationRecord
  has_many :users, dependent: :restrict_with_error

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end
