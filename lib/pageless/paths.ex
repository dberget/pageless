defmodule Pageless.Paths do
  @moduledoc """
  The Paths context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Paths.Path
  alias Pageless.Lessons.Lesson

  @doc """
  Gets a single path.
  """
  def get_path!(id), do: Repo.get!(Path, id)

  @doc """
  Gets all lessons given path.
  """
  def get_path_lessons(path_id) when is_integer(path_id) do
    query = from l in Lesson, where: l.path_id == ^path_id

    Repo.all(query)
  end

  def get_path_lessons(path_id) do
    id = String.to_integer(path_id)
    query = from l in Lesson, where: l.path_id == ^id

    Repo.all(query)
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
  Deletes a Path.
  """
  def delete_path(%Path{} = path) do
    Repo.delete(path)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking path changes.
  """
  def change_path(%Path{} = path) do
    Path.changeset(path, %{})
  end
end
