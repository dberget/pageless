# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pageless, ecto_repos: [Pageless.Repo]

# Configures the endpoint
config :pageless, PagelessWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "vVjSb7s1LXIzmznUwDD9htulx0nxLKqPa8t7UV1x+Wwi07mzWIzSk0ujCXwCU4PL",
  render_errors: [view: PagelessWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pageless.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
