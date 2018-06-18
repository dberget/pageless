defmodule Pageless.Courses.CourseLesson do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pageless.{Courses.Course, Lessons.Lesson}

  schema "course_lessons" do
    field :sort_id, :integer
    belongs_to(:lesson, Lesson)
    belongs_to(:course, Course)

    timestamps()
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:sort_id, :lesson_id, :course_id])
    |> validate_required([:lesson_id, :course_id])
  end
end
