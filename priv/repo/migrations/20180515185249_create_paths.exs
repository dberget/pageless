defmodule Pageless.Repo.Migrations.CreatePaths do
  use Ecto.Migration

  def change do
    create table(:paths) do
      add :description, :text
      add :title, :string
      add :company_id, references(:companies, on_delete: :nothing)

      timestamps()
    end
  end
end
