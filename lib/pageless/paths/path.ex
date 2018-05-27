defmodule Pageless.Paths.Path do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Paths.PathStep
  alias Pageless.Lessons.Lesson
  alias Pageless.Courses.Course

  schema "paths" do
    field :title, :string
    field :description, :string

    belongs_to :company, Pageless.Companies.Company
    many_to_many :lessons, Lesson, join_through: PathStep
    many_to_many :courses, Course, join_through: PathStep
    many_to_many :users, Pageless.Users.User, join_through: Pageless.Assignments.Assignment

    timestamps()
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [:description, :company_id, :title])
    |> validate_required([:company_id])
  end
end
