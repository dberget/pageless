alias Pageless.{Users.User, Assignments.Assignment, Companies.Company, Paths.Path, Lessons.Lesson}
alias Pageless.Repo

Repo.delete_all(User)
Repo.delete_all(Assignment)
Repo.delete_all(Company)
Repo.delete_all(Path)
Repo.delete_all(Lesson)

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

# lessons

lesson_details = [
  "This is lesson 1",
  "Onboarding Training lesson",
  "Your Lesson"
]

lessons =
  Enum.map(
    lesson_details,
    &Repo.insert!(%Lesson{
      description: &1,
      title: "Sample Lesson",
      type: Enum.random(["VIDEO", "ARTICLE", "ELEARNING", "OTHER"]),
      content: Enum.take_random(?a..?z, 10) |> to_string,
      path: Enum.random(paths)
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
