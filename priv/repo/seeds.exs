alias Pageless.{
  Users.User,
  Assignments.Assignment,
  Companies.Company,
  Paths.Path,
  Lessons.Lesson,
  Courses.Course,
  Courses.CourseLesson,
  Paths.PathStep
}

alias Pageless.Repo

Repo.delete_all(Course)
Repo.delete_all(User)
Repo.delete_all(Path)
Repo.delete_all(Lesson)
Repo.delete_all(Company)

company_names = ["Looney Tunes", "company"]

companies =
  Enum.map(
    company_names,
    &Repo.insert!(%Company{
      name: &1,
      subdomain: &1 |> String.downcase() |> String.replace(" ", "-")
    })
  )

# people

people_names = [
  "Kent Hrbek",
  "Tony Oliva",
  "Rod Carew",
  "Harmon Killebrew",
  "Kirby Puckett",
  "Sammy Sosa",
  "Billy Williams",
  "Cap Anson",
  "Mordecai Brown",
  "Ernie Banks",
  "David Berget"
]

people =
  Enum.map(people_names, fn person_name ->
    [first_name, last_name] = person_name |> String.split(" ")

    user =
      User.create_changeset(%User{
        first: first_name,
        last: last_name,
        email: String.downcase(first_name) <> String.downcase(last_name) <> "@gmail.com",
        password: "password",
        password_hash: Comeonin.Bcrypt.hashpwsalt("password"),
        state: Enum.random(["ACTIVE", "DISABLED"]),
        role: "ADMIN",
        company: Enum.random(companies)
      })

    Repo.insert!(user)
  end)

# paths

path_descriptions = [
  "This is path 1",
  "Onboarding Training",
  "Your Path"
]

paths =
  Enum.map(
    path_descriptions,
    &Repo.insert!(%Path{
      description: &1,
      title: "Sample Path",
      company: Enum.random(companies)
    })
  )

# courses

course_titles = [
  "Onboarding Training Course",
  "New Hire Sales Course",
  "An Awesome Course 1",
  "An Awesome Course 2",
  "An Awesome Course 3",
  "An Awesome Course 4",
  "Title of Course"
]

courses =
  Enum.map(
    course_titles,
    &Repo.insert!(%Course{
      description: "Awesome Course descrption goes here!",
      title: &1,
      company: Enum.random(companies),
      slug: URI.encode_www_form(&1)
    })
  )

# lessons

lesson_details = [
  "This is the first lesson",
  "Onboarding Training lesson",
  "Lesson 1",
  "Lesson 2",
  "Lesson 3",
  "Lesson 4",
  "Lesson 5",
  "Lesson 6",
  "Lesson 7",
  "Lesson 8",
  "Lesson 9",
  "Lesson 10"
]

lessons =
  Enum.map(
    lesson_details,
    &Repo.insert!(%Lesson{
      description: &1,
      title: &1,
      source_type: Enum.random(["FILE", "URL", "RICHTEXT"]),
      lesson_type: Enum.random(["VIDEO", "ARTICLE", "ELEARNING", "OTHER"]),
      company: Enum.random(companies),
      source: Enum.take_random(?a..?z, 100) |> to_string
    })
  )

# Course Lessons

Enum.each(lessons, fn lesson ->
  courses
  |> Enum.each(fn course ->
    Repo.insert!(%CourseLesson{
      course: course,
      lesson: lesson
    })
  end)
end)

# assignments

Enum.each(people, fn person ->
  courses
  |> Enum.each(fn course ->
    Repo.insert!(%Assignment{
      user: person,
      course: course,
      status: Enum.random(["COMPLETE", "INCOMPLETE", "REQUIRED", "OTHER"])
    })
  end)
end)
