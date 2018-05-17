defmodule Pageless.Paths do
  @moduledoc """
  The Paths context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Paths.Path

  @doc """
  Gets a single path.
  """
  def get_path!(id), do: Repo.get!(Path, id)

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
