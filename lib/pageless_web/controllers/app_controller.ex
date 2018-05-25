defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

  plug :get_subdomain

  def index(conn, _params) do
    user = conn.assigns[:current_user]

    conn
    |> assign(:api_token, PagelessWeb.Auth.generate_signed_jwt(user))
    |> render("index.html")
  end

  def admin(conn, _params) do
    user = conn.assigns[:current_user]

    conn
    |> assign(:api_token, PagelessWeb.Auth.generate_signed_jwt(user))
    |> render("admin.html")
  end

  defp get_subdomain(conn, _opts) do
    subdomain = String.split(conn.host, ".") |> hd()

    assign(conn, :subdomain, subdomain)
  end
end
