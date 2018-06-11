defmodule Pageless.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Courses.Course
  alias Pageless.Paths.PathStep
  alias Pageless.Paths.Path
  alias Pageless.Courses.CourseLesson

  @lesson_types ["VIDEO", "ARTICLE", "ELEARNING", "OTHER", "CLASSROOM"]

  @source_types ["FILE", "URL", "RICHTEXT"]

  schema "lessons" do
    field :title, :string
    field :description, :string
    field :lesson_type, :string
    field :source_type, :string
    field :source, :string

    belongs_to :company, Pageless.Companies.Company
    many_to_many :courses, Course, join_through: CourseLesson
    many_to_many :paths, Path, join_through: PathStep

    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:description, :lesson_type, :source_type, :source, :title, :company_id])
    |> validate()
  end

  def validate(changeset) do
    changeset
    |> validate_required([
      :description,
      :title,
      :type,
      :lesson_type,
      :company_id,
      :source,
      :source_type
    ])
    |> validate_subset(
      :lesson_type,
      @lesson_types,
      message:
        "#{changeset.lesson_type} not valid. Must be on of #{Enum.map(@lesson_types, &"#{&1}, ")}"
    )
    |> validate_subset(
      :source_type,
      @source_types,
      message:
        "#{changeset.source_type} not valid. Must be on of #{Enum.map(@lesson_types, &"#{&1}, ")}"
    )
  end
end
