defmodule Pageless.Lessons do
  @moduledoc """
  The lessons context.
  """

  import Ecto.Query, warn: false
  alias Pageless.{Repo, Search}

  alias Pageless.Lessons.Lesson

  @doc """
  Gets a single lessons.
  """
  def get_lesson!(id), do: Repo.get!(Lesson, id)

  def get_lesson_source(id) do
    query = from l in Lesson, where: l.id == ^id, select: l.source

    query
    |> Repo.one()
  end

  def get_company_lessons(company_id) do
    query = from l in Lesson, where: l.company_id == ^company_id

    query
    |> Repo.all()
  end

  def search_company_lessons(company_id, search_term) do
    Search.find(company_id, Lesson, search_term)
  end

  @doc """
  Creates a lessons.

  Required: 
      :description,
      :title,
      :type,
      :lesson_type,
      :company_id,
      :source,
      :source_type

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
