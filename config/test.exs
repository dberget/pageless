use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :pageless, PagelessWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :pageless, Pageless.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "davidberget",
  password: "",
  database: "pageless_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
