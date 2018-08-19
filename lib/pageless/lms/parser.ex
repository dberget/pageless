defmodule Pageless.LMS.Parser do
  @moduledoc """
  LMS helper module for parsing eLearning folders, and communicating with LMS's.
  """

  @doc """
  takes a zipped eLearning folder an returns the imsmanifest.xml file if it exists, otherwise returns {:error, reason}.
  """
  def get_manifest(path_to_zip) do
    with char_path <- String.to_charlist(path_to_zip),
         {:ok, zip_handle} <- :zip.zip_open(char_path, [:memory]),
         {:ok, {_file, _exists}} <- :zip.zip_get('imsmanifest.xml', zip_handle) do
      :zip.zip_close(zip_handle)
    else
      _err ->
        {:error, "unable to find manifest file"}
    end
  end
end
