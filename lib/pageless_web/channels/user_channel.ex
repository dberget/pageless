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

  def handle_in("get_course", %{"slug" => slug}, socket) do
    course =
      Pageless.Courses.get_course_by_slug(slug, :lessons)
      |> filter_course()

    {:reply, {:ok, %{course: course}}, socket}
  end

  def handle_in("search_company_courses", %{"search" => search, "topic" => topic}, socket) do
    company_id = socket.assigns[:current_user].user.company_id

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
      Pageless.Lessons.search_company_lessons(company_id, %{
        search: search,
        topic: topic,
        filter_field: :lesson_type
      })
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

  def filter_courses(course) do
    %{
      title: course.title,
      description: course.description,
      id: course.id,
      slug: course.slug
    }
  end

  def filter_course(course) do
    %{
      description: course.description,
      title: course.title,
      id: course.id,
      slug: course.slug,
      lessons: Enum.map(course.lessons, &filter_lesson(&1))
    }
  end

  def filter_steps(%Pageless.Courses.Course{} = step) do
    %{
      lessons: Enum.map(step.lessons, &filter_lesson(&1)),
      description: step.description,
      id: step.id,
      title: step.title,
      slug: step.slug
    }
  end

  def filter_steps(%Pageless.Lessons.Lesson{} = step) do
    %{
      content: step.source,
      source_type: step.source_type,
      lesson_type: step.lesson_type,
      description: step.description,
      id: step.id,
      title: step.title
    }
  end

  defp filter_lesson(lesson) do
    %{
      content: lesson.source,
      text: lesson.content,
      source_type: lesson.source_type,
      lesson_type: lesson.lesson_type,
      description: lesson.description,
      id: lesson.id,
      title: lesson.title
    }
  end
end
