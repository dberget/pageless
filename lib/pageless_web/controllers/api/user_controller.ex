defmodule PagelessWeb.Api.UserController do
  @moduledoc false

  use PagelessWeb, :controller

  def create(conn, params) do
    params["user"]
    |> Map.put("company_id", conn.assigns[:current_user].company_id)
    |> Pageless.Users.invite_user()

    json(conn, "ok")
  end
end
