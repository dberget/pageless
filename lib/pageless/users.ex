defmodule Pageless.Users do
  @moduledoc """
  The users context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Users.User
  alias Pageless.Assignments.Assignment
  alias Pageless.Paths.Path

  @doc """
  Returns the list of users.
  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.
  """
  def get_user_by_id(id) do
    case Repo.get(User, id) do
      %User{} = user ->
        {:ok, user}

      _ ->
        {:error, "User not found"}
    end
  end

  def get_user_assignments(id) do
    query = from a in Assignment, where: a.user_id == ^id

    Repo.all(query)
  end

  # def get_user_paths(id) do
  #   query = from p in Path, join: a in Assignment, where: a.user_id == ^id, select: p

  #   Repo.all(query)
  # end

  def preload_all(user) do
    user
    |> Repo.preload(paths: [:lessons])
  end

  @doc """
  Gets a single user by their email.
  """

  def get_user_by_email(email), do: Repo.get_by(User, email: email)

  @doc """
  Creates a user.
  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.create_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.
  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.create_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.
  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.
  """
  def change_user(%User{} = user) do
    User.create_changeset(user, %{})
  end
end
