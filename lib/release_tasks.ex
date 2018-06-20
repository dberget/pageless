defmodule Release.Tasks do
  def migrate do
    {:ok, _path} = Application.ensure_all_started(:pageless)

    path = Application.app_dir(:pageless, "priv/repo/migrations")

    Ecto.Migrator.run(Pageless.Repo, path, :up, all: true)
  end
end
