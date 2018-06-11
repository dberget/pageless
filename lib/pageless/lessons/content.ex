defmodule Content do
  use Ecto.Schema

  embedded_schema do
    field :path, :string
  end
end
