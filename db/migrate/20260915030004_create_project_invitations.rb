class CreateProjectInvitations < ActiveRecord::Migration[7.2]
  def change
    create_table :project_invitations, id: :uuid do |t|
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.references :invited_by, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.string :email, null: false
      t.string :role, null: false, default: 'maintainer'
      t.string :token, null: false
      t.string :status, null: false, default: 'pending'
      t.timestamps
    end

    add_index :project_invitations, :token, unique: true
    add_index :project_invitations, [:project_id, :email], unique: true
  end
end
