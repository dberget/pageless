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

  scope "/", PagelessWeb do
    pipe_through :admin_browser

    get "/admin", AppController, :admin
    put("/save", AppController, :save)
    put("/upload", AppController, :upload)
    get "/admin/:path", AppController, :admin
    get "/admin/:path/:subpath", AppController, :admin
    get "/admin/:path/:subpath/:page", AppController, :admin
  end

  scope "/", PagelessWeb do
    pipe_through :authenticated_browser

    get "/app", AppController, :index
    get "/app/:path", AppController, :index
    get "/app/:path/:id", AppController, :index
  end
end
