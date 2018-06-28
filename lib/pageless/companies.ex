defmodule Pageless.Companies do
  @moduledoc """
  The Companies context.
  """

  import Ecto.Query, warn: false
  alias Pageless.Repo

  alias Pageless.Companies.Company

  @doc """
  Returns the list of companies.
  """
  def list_companies do
    Repo.all(Company)
  end

  @doc """
  Gets a single company.

  Raises `Ecto.NoResultsError` if the Company does not exist.
  """
  def get_company!(id), do: Repo.get!(Company, id)

  @doc """
  Gets single company by subdomain
  """
  def get_by_subdomain(subdomain) do
    case Repo.get_by(Company, %{subdomain: subdomain}) do
      %Company{} = company ->
        {:ok, company}

      _ ->
        {:error, "company not found"}
    end
  end

  @doc """
  Creates a company.
  """
  def create_company(attrs \\ %{}) do
    %Company{}
    |> Company.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a company.
  """
  def update_company(%Company{} = company, attrs) do
    company
    |> Company.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking company changes.
  """
  def change_company(%Company{} = company) do
    Company.changeset(company, %{})
  end
end
