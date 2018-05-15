defmodule PagelessWeb.PageController do
  use PagelessWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
