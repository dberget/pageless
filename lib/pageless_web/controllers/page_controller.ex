defmodule PagelessWeb.PageController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    conn
    |> render("index.html")
  end
end
