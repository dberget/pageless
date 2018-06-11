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

  def save(conn, params) do
    params = Map.put(params, "company_id", conn.assigns[:current_user].company_id)
    Pageless.Lessons.create_lesson(params)

    send_resp(conn, 200, "")
  end

  def upload(conn, params) do
    # user = conn.assigns[:current_user])

    if upload = params["file"] do
      {:ok, _path} = File.cp_r(upload.path, "files/#{upload.filename}")

      send_resp(conn, 201, "ok")
    else
      send_resp(conn, 400, "error")
    end
  end

  defp get_subdomain(conn, _opts) do
    subdomain = String.split(conn.host, ".") |> hd()

    assign(conn, :subdomain, subdomain)
  end
end
