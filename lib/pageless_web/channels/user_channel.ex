defmodule PagelessWeb.UserChannel do
  use PagelessWeb, :channel

  def join("user: " <> _id, _params, socket) do
    user =
      socket.assigns[:current_user].user
      |> Pageless.Users.preload_all()
      |> filter_user()

    {:ok, %{user: user}, socket}
  end

  def handle_in("get_lessons", %{"path_id" => path_id}, socket) do
    lessons =
      Pageless.Paths.get_path_lessons(path_id)
      |> Enum.map(&filter_lessons/1)

    {:reply, {:ok, %{lessons: lessons}}, socket}
  end

  def handle_in("get_lesson", %{"lesson_id" => lesson_id}, socket) do
    lesson =
      Pageless.Lessons.get_lesson!(lesson_id)
      |> filter_lesson()

    {:reply, {:ok, %{lesson: lesson}}, socket}
  end

  defp filter_user(user) do
    %{
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      id: user.id,
      paths: Enum.map(user.paths, &filter_paths(&1))
    }
  end

  defp filter_paths(path) do
    %{
      company_id: path.company_id,
      description: path.description,
      title: path.title,
      id: path.id,
      lessons: Enum.map(path.lessons, &filter_lessons(&1))
    }
  end

  defp filter_lessons(lesson) do
    %{
      content: lesson.content,
      description: lesson.description,
      id: lesson.id,
      title: lesson.title,
      type: lesson.type
    }
  end

  defp filter_lesson(lesson) do
    %{
      content: lesson.content,
      description: lesson.description,
      id: lesson.id,
      title: lesson.title,
      type: lesson.type
    }
  end
end
