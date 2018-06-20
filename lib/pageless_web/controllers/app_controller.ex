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

  def upload(conn, params) do
    if upload = params["file"] do
      {:ok, [path]} = File.cp_r(upload.path, "files/#{upload.filename}")

      json(conn, %{path: path})
    else
      json(conn, %{error: "error, no file param"})
    end
  end

  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end

  defp get_subdomain(conn, _opts) do
    subdomain = String.split(conn.host, ".") |> hd()

    assign(conn, :subdomain, subdomain)
  end
end
