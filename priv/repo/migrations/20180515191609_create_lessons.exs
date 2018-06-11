defmodule Pageless.Repo.Migrations.CreateLesson do
  use Ecto.Migration

  def change do
    execute(
      "CREATE TYPE content_type AS ENUM ('VIDEO','ARTICLE', 'ELEARNING', 'OTHER','CLASSROOM')"
    )

    create table(:lessons) do
      add :title, :string, null: false
      add :description, :text
      add :type, :content_type
      add :content, :map
      add :company_id, references(:companies, on_delete: :delete_all)

      timestamps()
    end
  end
end
