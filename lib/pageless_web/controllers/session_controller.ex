defmodule PagelessWeb.SessionController do
  @moduledoc false

  use PagelessWeb, :controller

  plug :redirect_if_signed_in

  def new(conn, _params) do
    if conn.assigns[:subdomain] do
      render conn, "company_new.html"
    else
      render conn, "new.html"
    end
  end

  def create(conn, %{"session" => %{"email" => email, "password" => pass} = params}) do
    subdomain =
      if conn.assigns[:subdomain], do: conn.assigns[:subdomain], else: params["subdomain"]

    conn = put_session(conn, :subdomain, subdomain)

    case PagelessWeb.Auth.sign_in_with_credentials(conn, subdomain, email, pass) do
      {:ok, conn} ->
        redirect(conn, to: app_path(conn, :admin))

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
end
