# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pageless.Repo.insert!(%Pageless.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Companies

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
  "Ernie Banks"
]

people =
  Enum.map(people_names, fn person_name ->
    [first_name, last_name] = person_name |> String.split(" ")

    Repo.insert!(%User{
      first_name: first_name,
      last_name: last_name,
      email: first_name <> last_name <> "@gmail.com",
      state: Enum.random(["ACTIVE", "DISABLED"]),
      role: Enum.random(["ADMIN", "LEARNER"]),
      company: Enum.random(companies)
    })
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
      company: Enum.random(companies)
    })
  )

# lessons

lesson_descriptions = [
  "This is lesson 1",
  "Onboarding Training lesson",
  "Your Lesson"
]

lessons =
  Enum.map(
    path_descriptions,
    &Repo.insert!(%Lesson{
      description: &1,
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
