defmodule Pageless.Assignments do
  @moduledoc """
  The Assignments context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Assignments.Assignment

  @doc """
  Returns the list of all assignments.
  """
  def list_assignments do
    Repo.all(Assignment)
  end

  @doc """
  Gets a single assignment.
  """
  def get_assignment!(id), do: Repo.get!(Assignment, id)

  @doc """
  Gets a users assignments.
  """
  def get_user_assignments(user_id) do
    query = from a in Assignment, where: a.user_id == ^user_id

    Repo.all(query)
  end

  @doc """
  Creates a assignment.
  """
  def create_assignment(attrs \\ %{}) do
    %Assignment{}
    |> Assignment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a assignment.
  """
  def update_assignment(%Assignment{} = assignment, attrs) do
    assignment
    |> Assignment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Assignment.
  """
  def delete_assignment(%Assignment{} = assignment) do
    Repo.delete(assignment)
  end

  @doc """
  Creates assignment changeset. 
  """
  def change_assignment(%Assignment{} = assignment) do
    Assignment.changeset(assignment, %{})
  end
end
