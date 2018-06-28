defmodule Pageless.Assignments.Assignment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pageless.{Users.User, Courses.Course}

  schema "assignments" do
    field :status, :string

    belongs_to(:user, User)
    belongs_to(:course, Course)

    timestamps()
  end

  @doc false
  def changeset(assignment, attrs) do
    assignment
    |> cast(attrs, [:user_id, :course_id, :status])
    |> validate_required([:user_id, :course_id])
  end
end
