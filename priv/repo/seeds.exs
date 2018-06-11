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
Repo.delete_all(Assignment)
Repo.delete_all(Lesson)
Repo.delete_all(Company)

company_names = ["Acme", "Looney Tunes", "eLevate Interactive"]

companies =
  Enum.map(
    company_names,
    &Repo.insert!(%Company{
      name: &1,
      slug: 5 |> :crypto.strong_rand_bytes() |> Base.url_encode64() |> binary_part(0, 5)
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
        first_name: first_name,
        last_name: last_name,
        email: String.downcase(first_name) <> String.downcase(last_name) <> "@gmail.com",
        password: "password",
        password_hash: Comeonin.Bcrypt.hashpwsalt("password"),
        state: Enum.random(["ACTIVE", "DISABLED"]),
        role: Enum.random(["ADMIN", "LEARNER"]),
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

course_descriptions = [
  "This is a course",
  "Onboarding Training Course",
  "Your Course",
  "An awesome course"
]

courses =
  Enum.map(
    course_descriptions,
    &Repo.insert!(%Course{
      description: &1,
      title: "Sample Course",
      company: Enum.random(companies)
    })
  )

# lessons

lesson_details = [
  "This is the first lesson",
  "Onboarding Training lesson",
  "Your Lesson 1",
  "Your Lesson 2",
  "Your Lesson 3",
  "Your Lesson 4",
  "Your Lesson 5",
  "Your Lesson 6",
  "Your Lesson 7",
  "Your Lesson 8",
  "Your Lesson 9",
  "Your Lesson 10"
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

# assignments

Enum.each(people, fn person ->
  paths
  |> Enum.each(fn path ->
    Repo.insert!(%Assignment{
      user: person,
      path: path,
      status: Enum.random(["COMPLETE", "INCOMPLETE", "REQUIRED", "OTHER"])
    })
  end)
end)

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
