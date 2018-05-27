defmodule Pageless.Courses.CourseLesson do
  use Ecto.Schema

  alias Pageless.{Courses.Course, Lessons.Lesson}

  schema "course_lessons" do
    field :sort_id, :integer
    belongs_to(:lesson, Lesson)
    belongs_to(:course, Course)

    timestamps()
  end
end
