defmodule Pageless.TestHelpers do
  @moduledoc """
  Misc. test helpers.
  """

  def valid_company_params do
    %{
      state: "ACTIVE",
      name: "Test Co.",
      subdomain: "test-co"
    }
  end
end
