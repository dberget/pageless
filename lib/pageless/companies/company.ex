defmodule Pageless.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pageless.Paths.Path
  alias Pageless.Users.User

  schema "companies" do
    field :state, :string
    field :name, :string
    field :slug, :string

    has_many :user, User
    has_many :paths, Path
    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:state, :name, :slug])
    |> validate_required([:name])
  end
end
