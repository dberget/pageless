defmodule Pageless.Paths do
  @moduledoc """
  The Paths context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Paths.{Path, PathStep}
  alias Pageless.Lessons.Lesson
  alias Pageless.Courses.Course

  @doc """
  Gets a single path.
  """
  def get_path!(id), do: Repo.get!(Path, id)

  @doc """
  Get all steps for path.
  """
  def get_path_steps(path_id) do
    id = String.to_integer(path_id)
    query = from ps in PathStep, where: ps.path_id == ^id, order_by: :sort_id

    query
    |> Repo.all()
    |> load_lesson_or_course()
  end

  def load_lesson_or_course(steps) do
    steps
    |> Enum.map(&load_resource/1)
  end

  @doc """
  Creates a path.
  """
  def create_path(attrs \\ %{}) do
    %Path{}
    |> Path.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a path.
  """
  def update_path(%Path{} = path, attrs) do
    path
    |> Path.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Creates a pathstep.
  """
  def create_a_step_in_path(step) do
    params = step |> Map.take([:lesson_id, :course_id, :sort_id])

    %PathStep{}
    |> PathStep.changeset(params)
    |> Repo.insert()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking path changes.
  """
  def change_path(%Path{} = path) do
    Path.changeset(path, %{})
  end

  defp load_resource(%{type: "LESSON", lesson_id: id}) do
    Repo.get!(Lesson, id)
  end

  defp load_resource(%{type: "COURSE", course_id: id}) do
    Repo.get!(Course, id) |> Repo.preload(:lessons)
  end
end
