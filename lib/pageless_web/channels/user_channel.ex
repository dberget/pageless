defmodule PagelessWeb.UserChannel do
  use PagelessWeb, :channel

  def join("user: " <> _id, _params, socket) do
    user =
      socket.assigns[:current_user].user
      |> Pageless.Users.preload_all()
      |> filter_user()

    {:ok, %{user: user}, socket}
  end

  def handle_in("get_path", %{"path_id" => path_id}, socket) do
    steps =
      Pageless.Paths.get_path_steps(path_id)
      |> Enum.map(&filter_steps/1)

    {:reply, {:ok, %{path: steps}}, socket}
  end

  def handle_in("get_lessons", %{"path_id" => path_id}, socket) do
    lessons =
      Pageless.Paths.get_path_steps(path_id)
      |> Enum.map(&filter_steps/1)

    {:reply, {:ok, %{lessons: lessons}}, socket}
  end

  def handle_in("get_lesson", %{"lesson_id" => lesson_id}, socket) do
    lesson =
      Pageless.Lessons.get_lesson!(lesson_id)
      |> filter_lesson()

    {:reply, {:ok, %{lesson: lesson}}, socket}
  end

  def handle_in("get_company_lessons", _params, socket) do
    company_id = socket.assigns[:current_user].user.company_id

    lessons =
      Pageless.Lessons.get_company_lessons(company_id)
      |> Enum.map(&filter_steps/1)

    {:reply, {:ok, %{lessons: lessons}}, socket}
  end

  defp filter_user(user) do
    %{
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      company_id: user.company_id,
      id: user.id,
      paths: Enum.map(user.paths, &filter_paths(&1))
    }
  end

  def filter_paths(path) do
    %{
      company_id: path.company_id,
      description: path.description,
      title: path.title,
      id: path.id,
      lessons: Enum.map(path.lessons, &filter_lessons(&1))
    }
  end

  def filter_steps(%Pageless.Courses.Course{} = step) do
    %{
      lessons: Enum.map(step.lessons, &filter_lessons(&1)),
      description: step.description,
      id: step.id,
      title: step.title
    }
  end

  def filter_steps(%Pageless.Lessons.Lesson{} = step) do
    %{
      content: step.source,
      description: step.description,
      id: step.id,
      title: step.title,
      type: step.lesson_type
    }
  end

  defp filter_lessons(lesson) do
    %{
      content: lesson.source,
      description: lesson.description,
      id: lesson.id,
      title: lesson.title,
      type: lesson.lesson_type
    }
  end

  defp filter_lesson(lesson) do
    %{
      content: lesson.source,
      source_type: lesson.source_type,
      lesson_type: lesson.lesson_type,
      description: lesson.description,
      id: lesson.id,
      title: lesson.title,
      type: lesson.lesson_type
    }
  end
end
