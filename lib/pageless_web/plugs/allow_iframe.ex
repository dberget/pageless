defmodule PagelessWeb.Plugs.AllowIframe do
  @moduledoc """
  Allows affected ressources to be open in iframe.
  """
  alias Plug.Conn

  def init(opts \\ %{}), do: Enum.into(opts, %{})

  def call(conn, _opts) do
    Conn.put_resp_header(
      conn,
      "x-frame-options",
      "ALLOW-FROM http://staging.dashe.com/demo/What%20is%20a%20Leader%20Module%202%20Demo%20Version%20-%20Storyline%20output/story_html5.html"
    )
  end
end
