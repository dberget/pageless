defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    user = conn.assigns[:current_user]

    conn
    |> assign(:api_token, PagelessWeb.Auth.generate_signed_jwt(user))
    |> render("index.html")
  end
end
