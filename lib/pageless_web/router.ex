defmodule PagelessWeb.Router do
  use PagelessWeb, :router

  pipeline :anonymous_browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user_by_session
    plug :get_subdomain
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
    pipe_through [:admin_browser, :handle_subdomain, :set_api_token]

    get "/", AdminController, :index
    get "/:path", AdminController, :index
    get "/:path/:subpath", AdminController, :index
    get "/:path/:subpath/:page", AdminController, :index
  end

  scope "/app", PagelessWeb do
    pipe_through [:authenticated_browser, :set_api_token]

    get "/", AppController, :index
    get "/assignments", AppController, :index
    get "/lesson/:id", AppController, :index
    get "/:course", AppController, :index
  end

  def get_subdomain(conn, _opts) do
    case length(String.split(conn.host, ".")) do
      2 ->
        [subdomain | _] = String.split(conn.host, ".")
        assign(conn, :subdomain, subdomain)

      _ ->
        conn
    end
  end

  def set_subdomain(conn, _) do
    conn
    |> assign(:subdomain, get_session(conn, :subdomain))
  end

  def set_api_token(conn, _opts) do
    conn
    |> assign(:api_token, PagelessWeb.Auth.generate_signed_jwt(conn.assigns[:current_user]))
  end
end
