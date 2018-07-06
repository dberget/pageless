defmodule Pageless.Repo.Migrations.CreateAssignments do
  use Ecto.Migration

  def up do
    execute(
      "CREATE TYPE assignment_status AS ENUM ('COMPLETE','INCOMPLETE', 'REQUIRED', 'OTHER', 'OPTIONAL')"
    )

    create table(:assignments) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :course_id, references(:courses, on_delete: :nothing)
      add :status, :assignment_status

      timestamps()
    end

    unique_index(
      :assignments,
      [:user_id, :course_id],
      name: "assignments_user_id_course_id_unique_index"
    )
  end

  def down do
    drop(table(:assignments))
    execute("DROP TYPE assignment_status")
  end
end
