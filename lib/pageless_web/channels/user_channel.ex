defmodule PagelessWeb.UserChannel do
  use PagelessWeb, :channel

  def join("user: " <> _id, _params, socket) do
    user = filter_user(socket.assigns[:current_user])

    {:ok, %{user: user}, socket}
  end

  #   def handle_in("get_state", _params, socket) do
  #     slug = socket.assigns[:slug]
  #     {:ok, state} = Hangman.get_state(slug)

  #     {:reply, {:ok, state}, socket}
  #   end

  #   def handle_in("new_guess", params, socket) do
  #     slug = socket.assigns[:slug]
  #     {:ok, state} = Hangman.handle_guess(params["guess"], slug)

  #     broadcast!(socket, "new_guess", state)

  #     {:reply, :ok, socket}
  #   end

  #   def handle_in("new_word", params, socket) do
  #     slug = socket.assigns[:slug]
  #     {:ok, state} = Hangman.set_word(params["word"], slug)

  #     broadcast!(socket, "new_word", state)

  #     {:reply, :ok, socket}
  #   end

  defp filter_user(%{user: user}) do
    %{
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      id: user.id
    }
  end
end
