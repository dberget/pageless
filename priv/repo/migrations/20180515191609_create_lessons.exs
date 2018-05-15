defmodule Pageless.Repo.Migrations.CreateLessons do
  use Ecto.Migration

  def up do
    execute(
      "CREATE TYPE content_type AS ENUM ('LINK','ARTICLE', 'ELEARNING', 'ACTIVITY', 'OTHER')"
    )

    create table(:lessons) do
      add :description, :text
      add :type, :content_type
      add :content, :text
      add :path_id, references(:paths, on_delete: :nothing)
    end
  end

  def down do
    drop(table(:lessons))
    execute("DROP TYPE content_type")
  end
end
