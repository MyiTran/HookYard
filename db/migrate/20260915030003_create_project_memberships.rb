class CreateProjectMemberships < ActiveRecord::Migration[7.2]
  def change
    create_table :project_memberships, id: :uuid do |t|
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :role, null: false, default: 'maintainer'
      t.timestamps
    end

    add_index :project_memberships, [:project_id, :user_id], unique: true
  end
end
