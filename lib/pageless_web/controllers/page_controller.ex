defmodule PagelessWeb.PageController do
  @moduledoc false

  use PagelessWeb, :controller

  def index(conn, _params) do
    redirect(conn, to: session_path(conn, :new))
  end
end
