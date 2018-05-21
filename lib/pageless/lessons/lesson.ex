defmodule Pageless.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Paths.Path

  schema "lessons" do
    field :description, :string
    field :title, :string
    field :type, :string
    field :content, :string

    belongs_to :path, Path
    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:description, :type, :content, :path_id, :title])
    |> validate_required(attrs, [:description, :type, :content, :path_id])
  end
end
