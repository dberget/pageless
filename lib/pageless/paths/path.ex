defmodule Pageless.Paths.Path do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Companies.Company
  alias Pageless.Lessons.Lesson
  alias Pageless.Courses.Course
  alias Pageless.Paths

  schema "paths" do
    field :description, :string
    field :title, :string

    belongs_to :company, Company
    many_to_many :courses, Course, join_through: Paths.PathCourses
    many_to_many :lessons, Lesson, join_through: Paths.PathLessons
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
