defmodule Pageless.Repo.Migrations.AddingCourses do
  use Ecto.Migration

  def change do
    create table(:courses) do
      add :description, :text
      add :title, :string
      add :company_id, references(:companies)

      timestamps()
    end

    create table(:course_lessons) do
      add :course_id, references(:courses, on_delete: :delete_all)
      add :lesson_id, references(:lessons, on_delete: :delete_all)

      timestamps()
    end

    create table(:path_courses) do
      add :path_id, references(:paths, on_delete: :delete_all)
      add :course_id, references(:courses, on_delete: :delete_all)

      timestamps()
    end

    create table(:path_lessons) do
      add :path_id, references(:paths, on_delete: :delete_all)
      add :lesson_id, references(:lessons, on_delete: :delete_all)

      timestamps()
    end

    create(unique_index(:course_lessons, [:course_id, :lesson_id]))
    create(unique_index(:path_courses, [:path_id, :course_id]))
    create(unique_index(:path_lessons, [:path_id, :lesson_id]))
  end
end
