defmodule Pageless.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pageless.Paths.Path
  alias Pageless.Users.User
  alias Pageless.Courses.Course

  schema "companies" do
    field :state, :string
    field :name, :string
    field :subdomain, :string

    has_many :user, User
    has_many :paths, Path
    has_many :courses, Course
    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> change(subdomain: "company")
    |> cast(attrs, [:state, :name, :subdomain])
    |> validate_required([:name, :subdomain])
  end

  # TODO: change to user defined slug 
  defp random_slug() do
    # 5 |> :crypto.strong_rand_bytes() |> Base.url_encode64() |> binary_part(0, 5)
    "company"
  end
end
