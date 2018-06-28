defmodule Pageless.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def up do
    execute("CREATE TYPE company_state AS ENUM ('ACTIVE','DISABLED')")

    create table(:companies) do
      add :state, :company_state, null: false, default: "ACTIVE"
      add :name, :text, null: false
      add :subdomain, :string, null: false

      timestamps()
    end

    create(unique_index(:companies, ["lower(subdomain)"]))
  end

  def down do
    drop(table(:spaces))
    execute("DROP TYPE company_state")
  end
end
