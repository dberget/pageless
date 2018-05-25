defmodule Pageless.Courses.CourseLessons do
  use Ecto.Schema

  alias Pageless.{Lessons.Lesson, Courses.Course}

  schema "course_lessons" do
    belongs_to(:course, Course)
    belongs_to(:lesson, Lesson)

    timestamps()
  end
end
