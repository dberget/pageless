defmodule Pageless.Repo.Migrations.CreateLesson do
  use Ecto.Migration

  def up do
    execute(
      "CREATE TYPE lesson_type AS ENUM ('VIDEO', 'ARTICLE', 'ELEARNING', 'OTHER','CLASSROOM')"
    )

    execute("CREATE TYPE source_type AS ENUM ('FILE', 'URL', 'RICHTEXT')")

    create table(:lessons) do
      add :title, :string, null: false
      add :description, :text
      add :lesson_type, :lesson_type
      add :source, :text
      add :source_type, :source_type
      add :company_id, references(:companies, on_delete: :delete_all)

      timestamps()
    end
  end

  def down do
    drop(table(:lessons))
    execute("DROP TYPE content_type")
    execute("DROP TYPE source_type")
  end
end
