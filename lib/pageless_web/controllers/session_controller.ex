defmodule PagelessWeb.SessionController do
  @moduledoc false

  use PagelessWeb, :controller

  plug :redirect_if_signed_in

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"session" => %{"email" => email, "password" => pass} = params}) do
    subdomain =
      if conn.assigns[:subdomain], do: conn.assigns[:subdomain], else: params["subdomain"]

    conn = put_session(conn, :subdomain, subdomain)

    case PagelessWeb.Auth.sign_in_with_credentials(conn, subdomain, email, pass) do
      {:ok, conn} ->
        redirect(conn, to: admin_path(conn, :index))

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
      |> redirect(to: admin_path(conn, :index))
      |> halt()
    else
      conn
    end
  end

  # defp update_url(conn, _) do
  #   sub = conn.assigns[:subdomain]
  #   url = organization_url(conn, sub)
  #   conn = %{conn | host: url}

  #   conn
  # end

  # defp organization_url(conn, sub, params \\ %{}) do
  #   cur_uri = Phoenix.Controller.endpoint_module(conn).struct_url()
  #   cur_path = Phoenix.Controller.current_path(conn, params)
  #   org_host = "#{sub}.#{cur_uri.host}"

  #   PagelessWeb.Router.Helpers.url(%URI{cur_uri | host: org_host}) <> cur_path
  # end
end
