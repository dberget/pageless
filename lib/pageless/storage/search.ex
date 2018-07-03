defmodule Pageless.Search do
  @moduledoc """
  Data Search helper 
  """
  import Ecto.Query
  alias Pageless.Repo

  @defaults %{filter_field: nil, search: "", topic: ""}

  def find(company, resource, opts \\ %{}) do
    opts = Map.merge(@defaults, opts)

    resource
    |> base_query(company)
    |> search_query(opts.search)
    |> search_field(opts.filter_field, opts.topic)
    |> Repo.all()
  end

  def base_query(resource, company) do
    from c in resource, where: c.company_id == ^company
  end

  def search_query(q, ""), do: q
  def search_query(q, nil), do: q
  def search_query(q, %{"search" => "undefined"}), do: q

  def search_query(query, t) do
    from(
      c in query,
      where: ilike(c.title, ^"%#{t}%")
    )
  end

  defp search_field(query, nil, ""), do: query

  defp search_field(query, field, t) do
    from c in query,
      where: field(c, ^field) == ^t
  end
end
