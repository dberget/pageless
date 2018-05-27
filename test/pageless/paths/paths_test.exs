defmodule Pageless.PathsTest do
  use Pageless.DataCase

  alias Pageless.Paths

  describe "paths" do
    alias Pageless.Paths.Path

    @valid_attrs %{:title, :description, :steps}
    @update_attrs %{}
    @invalid_attrs %{}

    def path_fixture(attrs \\ %{}) do
      {:ok, path} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Paths.create_path()

      path
    end

    test "list_paths/0 returns all paths" do
      path = path_fixture()
      assert Paths.list_paths() == [path]
    end

    test "get_path!/1 returns the path with given id" do
      path = path_fixture()
      assert Paths.get_path!(path.id) == path
    end

    test "create_path/1 with valid data creates a path" do
      assert {:ok, %Path{} = path} = Paths.create_path(@valid_attrs)
    end

    test "create_path/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Paths.create_path(@invalid_attrs)
    end

    test "update_path/2 with valid data updates the path" do
      path = path_fixture()
      assert {:ok, path} = Paths.update_path(path, @update_attrs)
      assert %Path{} = path
    end

    test "update_path/2 with invalid data returns error changeset" do
      path = path_fixture()
      assert {:error, %Ecto.Changeset{}} = Paths.update_path(path, @invalid_attrs)
      assert path == Paths.get_path!(path.id)
    end

    test "delete_path/1 deletes the path" do
      path = path_fixture()
      assert {:ok, %Path{}} = Paths.delete_path(path)
      assert_raise Ecto.NoResultsError, fn -> Paths.get_path!(path.id) end
    end

    test "change_path/1 returns a path changeset" do
      path = path_fixture()
      assert %Ecto.Changeset{} = Paths.change_path(path)
    end
  end
end
