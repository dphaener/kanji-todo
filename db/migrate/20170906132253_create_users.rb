ROM::SQL.migration do
  change do
    create_table :users do
      primary_key :id
      column :email, "varchar(255)"
      column :name, "varchar(255)"
    end
  end
end
