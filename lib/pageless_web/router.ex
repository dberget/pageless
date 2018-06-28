defmodule PagelessWeb.Router do
  use PagelessWeb, :router

  pipeline :anonymous_browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user_by_session
  end

  pipeline :handle_subdomain do
    plug :set_subdomain
  end

  pipeline :authenticated_browser do
    plug :anonymous_browser
    plug :authenticate_user
  end

  pipeline :admin_browser do
    plug :anonymous_browser
    plug :validate_admin
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PagelessWeb do
    pipe_through :anonymous_browser

    get "/", PageController, :index

    get "/login", SessionController, :new
    post("/login", SessionController, :create)

    get("/logout", SessionController, :delete)
    delete("/logout", SessionController, :delete)
  end

  scope "/api", PagelessWeb.Api do
    pipe_through :admin_browser

    put("/course", CourseController, :create)
    put("/lesson", LessonController, :create)
    put("/upload", LessonController, :upload)
    put("/user", UserController, :create)

    get "/download/:id", LessonController, :download
  end

  scope "/admin", PagelessWeb do
    pipe_through [:handle_subdomain, :admin_browser]

    get "/", AppController, :admin
    get "/:path", AppController, :admin
    get "/:path/:subpath", AppController, :admin
    get "/:path/:subpath/:page", AppController, :admin
  end

  scope "/app", PagelessWeb do
    pipe_through [:handle_subdomain, :authenticated_browser]

    get "/", AppController, :index
    get "/:course", AppController, :show
  end

  def set_subdomain(conn, _opts) do
    with domain <- String.split(conn.host, "."),
         true <- length(domain) > 1,
         subdomain <- hd(domain) do
      conn
      |> assign(:subdomain, subdomain)
    else
      _ ->
        conn
    end
  end
end
