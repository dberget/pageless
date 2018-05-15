defmodule Pageless.Repo.Migrations.CreateAssignments do
  use Ecto.Migration

  def change do
    create table(:assignments) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :path_id, references(:paths, on_delete: :delete_all)
    end

    unique_index(
      :assignments,
      [:user_id, :path_id],
      name: "assignments_user_id_path_id_unique_index"
    )
  end
end
