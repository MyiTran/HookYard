# frozen_string_literal: true

class AddTenantToUsers < ActiveRecord::Migration[7.2]
  def change
    add_reference :users, :tenant, type: :uuid, foreign_key: true
  end
end
