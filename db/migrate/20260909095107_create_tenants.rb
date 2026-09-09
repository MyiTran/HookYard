class CreateTenants < ActiveRecord::Migration[7.2]
  def change
    create_table :tenants, id: :uuid do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.timestamps
    end

    add_index :tenants, :slug, unique: true
  end
end
