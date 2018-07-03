defmodule PagelessWeb.UserChannel do
  use PagelessWeb, :channel

  def join("user: " <> _id, _params, socket) do
    user =
      socket.assigns[:current_user].user
      |> filter_user()

    {:ok, %{user: user}, socket}
  end

  def handle_in("get_path", %{"path_id" => path_id}, socket) do
    steps =
      Pageless.Paths.get_path_steps(path_id)
      |> Enum.map(&filter_steps/1)

    {:reply, {:ok, %{path: steps}}, socket}
  end

  def handle_in("get_company_courses", _params, socket) do
    company_id = socket.assigns[:current_user].user.company_id

    courses =
      Pageless.Courses.get_company_courses(company_id)
      |> Enum.map(&filter_courses/1)

    {:reply, {:ok, %{courses: courses}}, socket}
  end

  def handle_in("get_course", %{"course_id" => course_id}, socket) do
    course =
      Pageless.Courses.get_course_with_lessons(course_id)
      |> filter_course()

    {:reply, {:ok, %{course: course}}, socket}
  end

  def handle_in("search_company_courses", %{"search" => search, "topic" => topic}, socket) do
    company_id = socket.assigns[:current_user].user.company_id
    IO.inspect(socket.assigns)

    courses =
      Pageless.Courses.search_company_courses(company_id, %{search: search, topic: topic})
      |> Enum.map(&filter_courses/1)

    {:reply, {:ok, %{courses: courses}}, socket}
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

  def handle_in("search_company_lessons", %{"search" => search, "topic" => topic}, socket) do
    company_id = socket.assigns[:current_user].user.company_id

    lessons =
      Pageless.Lessons.search_company_lessons(company_id, %{search: search, topic: topic})
      |> Enum.map(&filter_steps/1)

    {:reply, {:ok, %{lessons: lessons}}, socket}
  end

  defp filter_user(user) do
    %{
      first: user.first,
      last: user.last,
      email: user.email,
      company_id: user.company_id,
      id: user.id
    }
  end

  # def filter_courses(course) do
  #   %{
  #     company_id: course.company_id,
  #     description: course.description,
  #     title: course.title,
  #     id: course.id,
  #     lessons: Enum.map(course.lessons, &filter_lessons(&1))
  #   }
  # end

  def filter_courses(course) do
    %{
      title: course.title,
      description: course.description,
      id: course.id
    }
  end

  def filter_course(course) do
    %{
      description: course.description,
      title: course.title,
      id: course.id,
      lessons: Enum.map(course.lessons, &filter_lesson(&1))
    }
  end

  def filter_steps(%Pageless.Courses.Course{} = step) do
    %{
      lessons: Enum.map(step.lessons, &filter_lesson(&1)),
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
