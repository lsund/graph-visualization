
defmodule GetNV do

  def string_tail(s), do: String.slice(s, 1..String.length(s))

  def parse_ints([]), do: []
  def parse_ints([x | xs]) do
    case parse_int(x) do
      [] -> parse_ints(xs)
      [n, vs] -> [{n, vs} | parse_ints(xs)]
    end
  end

  def parse_int(""), do: [] 
  def parse_int(x) do  
    case Integer.parse(x) do
      :error -> x |> string_tail |> parse_int 
      {v, rest} ->
        [to_string(v) | parse_int(rest)]
    end
  end
  
  def read(path) do
    dir = path
    case File.ls(dir) do
      {:ok, list} -> list
      {:error, _} -> System.halt(1)
    end
  end
  

  def writeFile([], _), do: :done
  def writeFile([x | xs], file) do
    nline = "{n:" <> to_string(elem(x, 0))
    vsline = ", v:" <> to_string(elem(x, 1)) <> "},\n"
    IO.binwrite(file, nline <> vsline)
    writeFile(xs, file)
  end
end

readpath = hd(System.argv())
writepath = System.argv() |> tl |> hd

{:ok, file} = File.open(writepath, [:write])

tpls = GetNV.parse_ints(GetNV.read(readpath))
GetNV.writeFile(tpls, file)

File.close(file)

