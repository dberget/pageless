defmodule Pageless.Paths.Path do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Companies.Company
  alias Pageless.Lessons.Lesson

  schema "paths" do
    field :description, :string
    belongs_to :company, Company
    has_many :lessons, Lesson

    timestamps()
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [:description, :company_id])
    |> validate_required([])
  end
end
