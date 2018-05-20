defmodule PagelessWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel("user: *", PagelessWeb.UserChannel)

  transport(:websocket, Phoenix.Transports.WebSocket)

  def connect(%{"Authorization" => token}, socket) do
    with "Bearer " <> user_token <- token,
         {:ok, user} <- PagelessWeb.Auth.get_user_by_token(user_token) do
      {:ok, assign(socket, :current_user, user)}
    else
      _ -> :error
    end
  end

  def id(_socket), do: nil
end
