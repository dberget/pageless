defmodule Pageless.Courses.Course do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Companies.Company
  alias Pageless.Lessons.Lesson
  alias Pageless.Paths.Path
  alias Pageless.Paths
  alias Pageless.Course

  schema "courses" do
    field :description, :string
    field :title, :string

    belongs_to :company, Company
    many_to_many :paths, Path, join_through: Paths.PathCourses
    many_to_many :lessons, Lesson, join_through: Course.CourseLessons

    timestamps()
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [:description, :company_id, :title])
    |> validate_required([:company_id])
  end
end
