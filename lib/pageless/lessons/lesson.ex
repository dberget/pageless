defmodule Pageless.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Courses.Course
  alias Pageless.Paths.PathStep
  alias Pageless.Paths.Path
  alias Pageless.Courses.CourseLesson

  schema "lessons" do
    field :description, :string
    field :title, :string
    field :type, :string
    embeds_one :content, Content

    belongs_to :company, Pageless.Companies.Company
    many_to_many :courses, Course, join_through: CourseLesson
    many_to_many :paths, Path, join_through: PathStep

    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:description, :type, :content, :title, :company_id])
    |> validate_required([:description, :title, :type, :content, :company_id])
  end
end
