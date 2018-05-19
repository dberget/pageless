defmodule PagelessWeb.AppController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
