defmodule PagelessWeb.Router do
  use PagelessWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user_by_session
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PagelessWeb do
    pipe_through :browser

    get "/", PageController, :index

    get "/login", SessionController, :new
    post("/login", SessionController, :create)

    get "/:route", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PagelessWeb do
  #   pipe_through :api
  # end
end
