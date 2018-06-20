defmodule Pageless.Repo.Migrations.AddingCourses do
  use Ecto.Migration

  def change do
    execute("CREATE TYPE objective_type AS ENUM ('LESSON','COURSE')")

    create table(:courses) do
      add :description, :text
      add :title, :string
      add :slug, :string
      add :company_id, references(:companies, on_delete: :delete_all)

      timestamps()
    end

    create table(:course_lessons) do
      add :course_id, references(:courses, on_delete: :delete_all)
      add :lesson_id, references(:lessons, on_delete: :delete_all)
      add :sort_id, :integer

      timestamps()
    end

    create table(:path_steps) do
      add :path_id, references(:paths, on_delete: :delete_all)
      add :type, :objective_type

      add :course_id, references(:courses, on_delete: :delete_all)
      add :lesson_id, references(:lessons, on_delete: :delete_all)
      add :sort_id, :integer

      timestamps()
    end

    create(unique_index(:course_lessons, [:course_id, :lesson_id]))
    create(unique_index(:path_steps, [:path_id, :course_id, :lesson_id]))
    create(unique_index(:path_steps, [:sort_id, :path_id]))
  end
end
