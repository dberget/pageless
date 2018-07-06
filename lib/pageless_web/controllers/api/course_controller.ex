defmodule PagelessWeb.Api.CourseController do
  @moduledoc false

  use PagelessWeb, :controller

  def create(conn, params) do
    params
    |> Map.put("company_id", conn.assigns[:current_user].company_id)
    |> Pageless.Courses.create_course()

    json(conn, "ok")
  end
end
