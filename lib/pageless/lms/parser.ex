defmodule Pageless.LMS.Parser do
  @moduledoc """
  LMS helper module for parsing eLearning folders, and communicating with LMS's.
  """

  @doc """
  takes a zipped eLearning folder an returns the imsmanifest.xml file if it exists, otherwise returns {:error, reason}.
  """
  def get_manifest(path_to_zip) do
    char_path = String.to_char_list(path_to_zip)

    case :zip.unzip(char_path, file_list: ['imsmanifest.xml']) do
      {:ok, []} ->
        {:error, "No manifest file exists"}

      {:ok, file} ->
        {:ok, file}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
