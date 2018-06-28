defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

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

  def show(conn, params) do
    user = conn.assigns[:current_user]
    course = Pageless.Courses.get_course_by_slug(params["course"], :lessons)

    conn
    |> assign(:api_token, PagelessWeb.Auth.generate_signed_jwt(user))
    |> render("index.html", course: course)
  end

  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end
end
