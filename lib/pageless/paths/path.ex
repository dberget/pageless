defmodule Pageless.Paths.Path do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Companies.Company
  alias Pageless.Lessons.Lesson
  alias Pageless.Assignments.Assignment

  schema "paths" do
    field :description, :string

    belongs_to :company, Company
    has_many :lessons, Lesson
    has_many :assignments, Assignment
    timestamps()
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [:description, :company_id])
    |> validate_required([:company_id])
  end
end
