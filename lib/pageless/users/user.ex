defmodule Pageless.Users.User do
  @moduledoc """
  The User schema.
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias Comeonin.Bcrypt
  alias Ecto.Changeset
  alias Pageless.Companies.Company
  alias Pageless.Assignments.Assignment

  schema "users" do
    field :email, :string
    field :first, :string
    field :last, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :role, :string
    field :state, :string, read_after_writes: true
    field :session_salt, :string

    belongs_to :company, Company
    many_to_many :courses, Pageless.Courses.Course, join_through: Assignment

    timestamps()
  end

  @doc false
  def create_changeset(struct, attrs \\ %{}) do
    struct
    |> cast(attrs, [:email, :role, :first, :last, :password])
    |> validate()
    |> put_password_hash()
    |> put_change(:session_salt, generate_salt())
  end

  @doc false
  def invite_changeset(struct, attrs \\ %{}) do
    struct
    |> cast(attrs, [:email, :role, :first, :last, :company_id])
    |> validate_required([:first, :last, :email, :company_id])
    |> validate_format(:email, email_format())
  end

  @doc false
  def changeset(struct, attrs \\ %{}) do
    struct
    |> cast(attrs, [:email, :role, :first, :last, :password])
    |> put_password_hash()
    |> put_change(:session_salt, generate_salt())
  end

  @doc """
  Applies user attribute validations to a changeset.
  """
  def validate(changeset) do
    changeset
    |> validate_required([:first, :last, :email, :password])
    |> validate_length(:email, min: 1, max: 254)
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
