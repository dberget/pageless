defmodule Pageless.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Paths.Path
  alias Pageless.Paths
  alias Pageless.Courses
  alias Pageless.Courses.Course

  schema "lessons" do
    field :description, :string
    field :title, :string
    field :type, :string
    field :content, :string

    many_to_many :courses, Course, join_through: Courses.CourseLessons
    many_to_many :paths, Path, join_through: Paths.PathLessons

    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:description, :type, :content, :path_id, :title])
    |> validate_required(attrs, [:description, :type, :content])
  end
end
