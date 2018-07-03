defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    conn
    |> render("index.html")
  end

  def show(conn, params) do
    course = Pageless.Courses.get_course_by_slug(params["course"], :lessons)

    conn
    |> render(:index, course: course)
  end

  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end
end
