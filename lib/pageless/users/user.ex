defmodule Pageless.Users.User do
  @moduledoc """
  The User schema.
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias Comeonin.Bcrypt
  alias Ecto.Changeset
  alias Pageless.Companies.Company

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :role, :string
    field :state, :string, read_after_writes: true
    field :session_salt, :string
    belongs_to :company, Company
    # has_many :assignments, Assignment

    timestamps()
  end

  @doc false
  def create_changeset(struct, attrs \\ %{}) do
    struct
    |> cast(attrs, [:email, :first_name, :last_name, :password])
    |> validate()
    |> put_password_hash()
    |> put_change(:session_salt, generate_salt())
  end

  @doc """
  Applies user attribute validations to a changeset.
  """
  def validate(changeset) do
    changeset
    |> validate_required([:first_name, :last_name, :email, :password])
    |> validate_length(:email, min: 1, max: 254)
    |> validate_length(:first_name, min: 1, max: 255)
    |> validate_length(:last_name, min: 1, max: 255)
    |> validate_length(:password, min: 6)
    |> validate_format(:email, email_format())
    |> unique_constraint(:email, name: :users_company_id_email_index)
  end

  defp email_format do
    ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  end

  defp generate_salt do
    16
    |> :crypto.strong_rand_bytes()
    |> Base.encode16()
    |> String.downcase()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Bcrypt.hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
