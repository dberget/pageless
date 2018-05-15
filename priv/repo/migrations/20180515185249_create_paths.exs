defmodule Pageless.Repo.Migrations.CreatePaths do
  use Ecto.Migration

  def change do
    create table(:paths) do
      add :description, :text
      add :company_id, references(:companies, on_delete: :nothing)
    end
  end
end
