defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    conn
    |> render("index.html")
  end

  def admin(conn, _params) do
    sub = conn.assigns[:subdomain]
    url = organization_url(conn, sub)
    conn = %{conn | host: url}

    conn
    |> render("admin.html")
  end

  def show(conn, params) do
    course = Pageless.Courses.get_course_by_slug(params["course"], :lessons)

    conn
    |> render("index.html", course: course)
  end

  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end

  defp organization_url(conn, sub, params \\ %{}) do
    cur_uri = Phoenix.Controller.endpoint_module(conn).struct_url()
    cur_path = Phoenix.Controller.current_path(conn, params)
    org_host = "#{sub}.#{cur_uri.host}"

    PagelessWeb.Router.Helpers.url(%URI{cur_uri | host: org_host}) <> cur_path
  end
end
