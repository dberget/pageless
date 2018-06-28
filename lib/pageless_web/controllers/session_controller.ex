defmodule PagelessWeb.SessionController do
  @moduledoc false

  use PagelessWeb, :controller

  plug :redirect_if_signed_in
  plug :set_subdomain

  def new(conn, _params) do
    if conn.assigns[:subdomain] do
      render conn, "company_new.html"
    else
      render conn, "new.html"
    end
  end

  def create(conn, %{"session" => %{"email" => email, "password" => pass} = params}) do
    conn =
      unless conn.assigns[:subdomain],
        do: assign(conn, :subdomain, params["subdomain"]),
        else: conn

    case PagelessWeb.Auth.sign_in_with_credentials(conn, email, pass) do
      {:ok, conn} ->
        conn
        |> redirect(to: app_path(conn, :admin))

      {:error, _reason, conn} ->
        conn
        |> put_flash(:error, "Oops, those credentials are not correct")
        |> redirect(to: session_path(conn, :new))
    end
  end

  def delete(conn, _params) do
    conn
    |> PagelessWeb.Auth.sign_out()
    |> redirect(to: session_path(conn, :new))
  end

  defp redirect_if_signed_in(conn, _opts) do
    if conn.path_info !== ["logout"] && conn.assigns.current_user do
      conn
      |> redirect(to: app_path(conn, :admin))
      |> halt()
    else
      conn
    end
  end

  def set_subdomain(conn, _opts) do
    with domain <- String.split(conn.host, "."),
         true <- length(domain) > 1,
         subdomain <- hd(domain) do
      conn
      |> assign(:subdomain, subdomain)
    else
      _ ->
        conn
    end
  end
end
