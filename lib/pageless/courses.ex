defmodule Pageless.Courses do
  @moduledoc """
  The course context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Courses.{Course, CourseLesson}

  @doc """
  Gets a single course.
  """
  def get_course!(id), do: Repo.get!(Course, id)

  @doc """
   gets lessons in course.
  """
  def get_course_lessons(course_id) do
    course_id = String.to_integer(course_id)

    query = from cl in CourseLesson, where: cl.course_id == ^course_id, order_by: :sort_id

    query
    |> Repo.all()
  end

  @doc """
  Creates a course.
  """
  def create_course(attrs \\ %{}) do
    %Course{}
    |> Course.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a course.
  """
  def update_course(%course{} = course, attrs) do
    course
    |> Course.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a course.
  """
  def delete_course(%course{} = course) do
    Repo.delete(course)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking course changes.
  """
  def change_course(%course{} = course) do
    Course.changeset(course, %{})
  end
end
