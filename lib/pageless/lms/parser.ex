defmodule Pageless.LMS.Parser do
  @moduledoc """
  LMS helper module for parsing eLearning folders, and communicating with LMS's.
  """

  @doc """
  takes a zipped eLearning folder an returns the imsmanifest.xml file.
  """
  def get_manifest(path_to_zip) do
    case :zip.unzip(path_to_zip, file_list: ['imsmanifest.xml']) do
      {:ok, []} ->
        {:error, "No manifest file exists"}

      {:ok, file} ->
        file

      {:error, reason} ->
        {:error, reason}
    end
  end
end
