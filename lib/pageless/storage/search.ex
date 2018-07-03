defmodule Pageless.Search do
  @moduledoc """
  Data Search helper 
  """
  import Ecto.Query
  alias Pageless.Repo

  def find(company, resource, %{search: term, topic: topic}) do
    resource
    |> base_query(company)
    |> search_query(term)
    |> search_field(:lesson_type, topic)
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

  defp search_field(query, _field, ""), do: query

  defp search_field(query, field, t) do
    from c in query,
      where: field(c, ^field) == ^t
  end
end
