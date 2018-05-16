defmodule Pageless.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Paths.Path

  schema "lessons" do
    field :description, :string
    field :type, :string
    field :content, :string

    belongs_to :path, Path
    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:description, :type, :content, :path_id])
    |> validate_required(attrs, [:description, :type, :content, :path_id])
  end
end
