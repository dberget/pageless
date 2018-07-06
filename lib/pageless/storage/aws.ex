defmodule Pageless.AWS do
  @moduledoc """
  The AWS context.
  """
  alias ExAws.S3
  alias Pageless.AWS

  defstruct [:filename, :src_path, :content_type, :size, :zip, :errors]

  @bucket "pageless"

  def upload(upload) when is_map(upload) do
    file =
      %AWS{filename: "img-#{upload.filename}", src_path: upload.path}
      |> get_file_size()
      |> send_to_aws()

    "https://s3.us-east-2.amazonaws.com/pageless/temp/#{URI.encode_www_form(file.filename)}"
  end

  def upload(path) when is_bitstring(path) do
    file =
      %AWS{filename: Path.basename(path), src_path: path}
      |> get_file_size()
      |> send_to_aws()

    "https://s3.us-east-2.amazonaws.com/pageless/temp/#{URI.encode_www_form(file.filename)}"
  end

  # def save(%{size: size} = upload) when size > 1_000_000 do
  #   upload.src_path
  #   |> S3.Upload.stream_file()
  #   |> S3.upload(@bucket, "temp/#{upload.filename}")
  #   |> ExAws.request()
  # end

  def send_to_aws(upload) do
    {:ok, _resp} =
      S3.put_object(@bucket, "temp/#{upload.filename}", File.read!(upload.src_path))
      |> ExAws.request()

    upload
  end

  defp get_file_size(upload) do
    stats = File.stat!(upload.src_path)

    %AWS{upload | size: stats.size}
  end
end
