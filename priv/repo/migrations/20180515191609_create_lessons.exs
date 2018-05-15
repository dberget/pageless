defmodule Pageless.Repo.Migrations.CreateLesson do
  use Ecto.Migration

  def change do
    execute("CREATE TYPE content_type AS ENUM ('VIDEO','ARTICLE', 'ELEARNING', 'OTHER')")

    create table(:lessons) do
      add :description, :text
      add :type, :content_type
      add :content, :text

      add :path_id, references(:paths, on_delete: :nothing)
    end
  end
end
