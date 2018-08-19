defmodule Pageless.AWS do
  @moduledoc """
  The AWS context.
  """
  alias ExAws.S3
  alias Pageless.AWS

  defstruct [:filename, :src_path, :content_type, :size, :errors]

  @bucket "pageless"

  def upload(upload) when is_map(upload) do
    file =
      %AWS{
        filename: "#{upload.filename}",
        content_type: upload.content_type,
        src_path: upload.path
      }
      |> file_type()
      |> create_unique_filename()
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

  def save(%{size: size} = upload) when size > 1_000_000 do
    upload.src_path
    |> S3.Upload.stream_file()
    |> S3.upload(@bucket, "temp/#{upload.filename}")
    |> ExAws.request()
  end

  def file_type(%{content_type: "application/pdf"} = aws) do
    aws
  end

  def file_type(%{src_path: path, content_type: "application/zip"} = aws) do
    aws
  end

  def file_type(%{content_type: _} = aws) do
    aws
  end

  def create_unique_filename(%{filename: name} = aws) do
    unique_name = "company/#{Ecto.UUID.generate()}-#{Path.basename(name)}"

    %AWS{aws | filename: unique_name}
  end

  def send_to_aws(%{filename: name} = upload) do
    S3.put_object(@bucket, name, File.read!(upload.src_path))
    |> ExAws.request()

    upload
  end

  defp get_file_size(upload) do
    stats = File.stat!(upload.src_path)

    %AWS{upload | size: stats.size}
  end
end
