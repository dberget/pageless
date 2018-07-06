defmodule PagelessWeb.Api.LessonController do
  @moduledoc false

  use PagelessWeb, :controller

  def create(conn, params) do
    params
    |> Map.put("company_id", conn.assigns[:current_user].company_id)
    |> Pageless.Lessons.create_lesson()

    json(conn, "ok")
  end

  def upload(conn, params) do
    if upload = params["file"] do
      # {:ok, [path]} = File.cp_r(upload.path, "files/#{upload.filename}")
      url = Pageless.AWS.upload(upload)

      IO.inspect(url)
      json(conn, %{path: url})
    else
      json(conn, %{error: "error, no valid file sent"})
    end
  end

  def download(conn, params) do
    source = Pageless.Lessons.get_lesson_source(params["id"])

    send_download(conn, {:file, source})
  end
end
