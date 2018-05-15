defmodule Pageless.Assignments.Assignment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "assignments" do
    field :user_id, :id
    field :path_id, :id

    timestamps()
  end

  @doc false
  def changeset(assignment, attrs) do
    assignment
    |> cast(attrs, [:user_id, :path_id])
    |> validate_required([:user_id, :path_id])
  end
end
