defmodule Pageless.Assignments.Assignment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pageless.{Users.User, Paths.Path}

  schema "assignments" do
    field :status, :string

    belongs_to(:user, User)
    belongs_to(:path, Path)
    timestamps()
  end

  @doc false
  def changeset(assignment, attrs) do
    assignment
    |> cast(attrs, [:user_id, :path_id])
    |> validate_required([:user_id, :path_id])
  end
end
