defmodule PagelessWeb.AdminController do
  use PagelessWeb, :controller

  def index(conn, _params) do
    conn
    |> render(:index)
  end
end
