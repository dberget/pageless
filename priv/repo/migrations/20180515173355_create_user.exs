defmodule Pageless.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def up do
    execute("CREATE TYPE user_state AS ENUM ('ACTIVE','DISABLED')")
    execute("CREATE TYPE user_role AS ENUM ('ADMIN','LEARNER')")

    create table(:users) do
      add :state, :user_state, null: false, default: "ACTIVE"
      add :email, :text, null: false
      add :first_name, :text, null: false
      add :last_name, :text, null: false
      add :password_hash, :text
      add :session_salt, :text, null: false, default: "salt"
      add :company_id, references(:companies)
      add :role, :user_role, default: "LEARNER"

      timestamps()
    end

    create(index(:users, [:id]))
    create(unique_index(:users, ["lower(email)"]))
  end

  def down do
    drop(table(:users))
    execute("DROP TYPE user_state")
  end
end
