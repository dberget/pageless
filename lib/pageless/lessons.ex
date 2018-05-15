defmodule Pageless.Lessons do
  @moduledoc """
  The lessons context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Lessons.Lesson

  @doc """
  Returns the list of lessons.

  ## Examples

      iex> list_lessonss()
      [%Lesson{}, ...]

  """
  def list_lessons do
    Repo.all(Lesson)
  end

  @doc """
  Gets a single lessons.

  Raises `Ecto.NoResultsError` if the lessons does not exist.

  ## Examples

      iex> get_lesson!(123)
      %Lesson{}

      iex> get_lesson!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lesson!(id), do: Repo.get!(Lesson, id)

  @doc """
  Creates a lessons.

  ## Examples

      iex> create_lessons(%{field: value})
      {:ok, %Lesson{}}

      iex> create_lessons(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_lesson(attrs \\ %{}) do
    %Lesson{}
    |> Lesson.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a lessons.

  ## Examples

      iex> update_lesson(Lessons, %{field: new_value})
      {:ok, %Lesson{}}

      iex> update_lesson(Lessons, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_lesson(%Lesson{} = lesson, attrs) do
    lesson
    |> Lesson.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a lesson.

  ## Examples

      iex> delete_lessons(lessons)
      {:ok, %Lesson{}}

      iex> delete_lessons(lessons)
      {:error, %Ecto.Changeset{}}

  """
  def delete_lesson(%Lesson{} = lesson) do
    Repo.delete(lesson)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking lessons changes.

  ## Examples

      iex> change_lessons(lessons)
      %Ecto.Changeset{source: %Lesson{}}

  """
  def change_lesson(%Lesson{} = lesson) do
    Lesson.changeset(lesson, %{})
  end
end
