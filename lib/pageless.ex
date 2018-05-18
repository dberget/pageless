defmodule Pageless do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(Pageless.Repo, []),
      supervisor(PagelessWeb.Endpoint, [])
    ]

    opts = [strategy: :one_for_one, name: Pageless.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    PagelessWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
