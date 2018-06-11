defmodule PagelessWeb.SessionController do
  @moduledoc false

  use PagelessWeb, :controller

  plug :fetch_current_user_by_session
  plug :redirect_if_signed_in

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) do
    case PagelessWeb.Auth.sign_in_with_credentials(conn, email, pass) do
      {:ok, conn} ->
        conn
        |> redirect(to: app_path(conn, :admin))

      {:error, _reason, conn} ->
        conn
        |> put_flash(:error, "Oops, those credentials are not correct")
        |> render("new.html")
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
      |> redirect(to: app_path(conn, :index))
      |> halt()
    else
      conn
    end
  end
end
