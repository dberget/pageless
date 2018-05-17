defmodule Pageless.Lessons do
  @moduledoc """
  The lessons context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Lessons.Lesson

  @doc """
  Gets a single lessons.
  """
  def get_lesson!(id), do: Repo.get!(Lesson, id)

  @doc """
  Creates a lessons.
  """
  def create_lesson(attrs \\ %{}) do
    %Lesson{}
    |> Lesson.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a lessons.
  """
  def update_lesson(%Lesson{} = lesson, attrs) do
    lesson
    |> Lesson.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a lesson.
  """
  def delete_lesson(%Lesson{} = lesson) do
    Repo.delete(lesson)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking lessons changes.
  """
  def change_lesson(%Lesson{} = lesson) do
    Lesson.changeset(lesson, %{})
  end
end
