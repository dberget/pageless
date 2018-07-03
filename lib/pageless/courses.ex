defmodule Pageless.Courses do
  @moduledoc """
  The course context.
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Pageless.Repo
  alias Pageless.Search

  alias Pageless.Courses.{Course, CourseLesson}

  @doc """
  Gets a single course.
  """
  def get_course!(id), do: Repo.get!(Course, id)

  def get_company_courses(company_id) do
    query = from c in Course, where: c.company_id == ^company_id

    query
    |> Repo.all()
  end

  def search_company_courses(company_id, search_term) do
    Search.find(company_id, Course, search_term)
  end

  def get_course_with_lessons(id) do
    Repo.get!(Course, id) |> Repo.preload(:lessons)
  end

  def get_course_by_slug(slug, preload \\ "none") do
    case Repo.get_by(Course, %{slug: slug}) do
      %Course{} = course ->
        cond do
          is_atom(preload) ->
            Pageless.Repo.preload(course, preload)

          false ->
            course
        end

      _ ->
        {:error, "course not found"}
    end
  end

  @doc """
   gets lessons in course.
  """
  def get_course_lessons(%Course{} = course) do
    query = from cl in CourseLesson, where: cl.course_id == ^course.id, order_by: :sort_id

    query
    |> Repo.all()
  end

  def get_course_lessons(course_id) when is_bitstring(course_id) do
    query = from cl in CourseLesson, where: cl.course_id == ^course_id, order_by: :sort_id

    query
    |> Repo.all()
  end

  def get_course_lessons(course_id) do
    course_id = String.to_integer(course_id)

    query = from cl in CourseLesson, where: cl.course_id == ^course_id, order_by: :sort_id

    query
    |> Repo.all()
  end

  def update_course(%Course{} = course, attrs) do
    course
    |> Course.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Creates a course.
  """
  def create_course(%{"lessons" => lessons} = params) do
    Multi.new()
    |> Multi.insert(:course, create_course_changeset(params))
    |> Multi.run(:course_lesson, fn %{course: course} ->
      {:ok, lessons} = create_course_lessons(course.id, lessons)
      {count, _} = Repo.insert_all(CourseLesson, lessons)

      case count == length(lessons) do
        true ->
          {:ok, count}

        false ->
          {:error, IO.inspect("#{length(lessons) - count} lessons failed to save")}
      end
    end)
    |> Repo.transaction()
  end

  def create_course_changeset(attrs \\ %{}) do
    %Course{}
    |> Course.changeset(attrs)
  end

  def create_course_lessons(course_id, lessons) do
    timestamp = NaiveDateTime.utc_now()

    lessons =
      Enum.map(
        lessons,
        &%{
          course_id: course_id,
          lesson_id: &1["id"],
          inserted_at: timestamp,
          updated_at: timestamp
        }
      )

    {:ok, lessons}
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
