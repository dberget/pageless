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
    |> change(slug: random_slug())
    |> cast(attrs, [:state, :name, :slug])
    |> validate_required([:name, :slug])
  end

  # TODO: change to user defined slug 
  defp random_slug() do
    5 |> :crypto.strong_rand_bytes() |> Base.url_encode64() |> binary_part(0, 5)
  end
end
