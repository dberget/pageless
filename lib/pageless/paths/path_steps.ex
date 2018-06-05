defmodule Pageless.Paths.PathStep do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.{Courses.Course, Paths.Path, Lessons.Lesson}

  schema "path_steps" do
    field :sort_id, :integer
    field :type, :string

    belongs_to(:path, Path)
    belongs_to(:lesson, Lesson)
    belongs_to(:course, Course)

    timestamps()
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:sort_id, :path_id, :lesson_id, :course_id])
    |> add_type()
    |> validate_required([:sort_id])
  end

  defp add_type(cs) do
    cond do
      get_change(cs, :lesson_id) !== nil ->
        put_change(cs, :type, "LESSON")

      get_change(cs, :course_id) !== nil ->
        put_change(cs, :type, "COURSE")

      true ->
        cs
    end
  end
end
