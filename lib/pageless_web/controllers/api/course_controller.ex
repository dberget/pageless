defmodule PagelessWeb.Api.CourseController do
  @moduledoc false

  use PagelessWeb, :controller

  def create(conn, params) do
    params
    |> Map.put("company_id", conn.assigns[:current_user].company_id)
    |> Pageless.Courses.create_course()

    json(conn, "ok")
  end

  def upload(conn, params) do
    if upload = params["file"] do
      {:ok, [path]} = File.cp_r(upload.path, "files/#{upload.filename}")

      json(conn, %{path: path})
    else
      json(conn, %{error: "error, no file param"})
    end
  end

  @moduledoc """
  Not currently doing anything. 
  """
  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end
end
