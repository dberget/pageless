defmodule Pageless.Paths.PathLessons do
  use Ecto.Schema

  alias Pageless.{Lessons.Lesson, Paths.Path}

  schema "path_lessons" do
    belongs_to(:path, Path)
    belongs_to(:lesson, Lesson)

    timestamps()
  end
end
