defmodule Pageless.Paths.Path do
  use Ecto.Schema
  import Ecto.Changeset

  alias Pageless.Companies.Company

  schema "paths" do
    field :description, :string
    belongs_to :company, Company

    timestamps()
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [])
    |> validate_required([])
  end
end
