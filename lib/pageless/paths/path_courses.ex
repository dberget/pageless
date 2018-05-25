defmodule Pageless.Paths.PathCourses do
  use Ecto.Schema

  alias Pageless.{Courses.Course, Paths.Path}

  schema "path_courses" do
    belongs_to(:path, Path)
    belongs_to(:course, Course)

    timestamps()
  end
end
