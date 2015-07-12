
defmodule ConvertCsv do

  @min_dist 0.01
  @distance_delimiter 0.4
  
  def run(source, dest) do
    {:ok, table} = File.read!(source) |> ExCsv.parse
    nv = length(hd(table.body))
    vs = mk_vertices(nv)
    bs = mk_bonds(table, nv)
    writejson(dest, vs, bs)
  end

  def writejson(path, vertices, bonds) do
    {:ok, file} = File.open(path, [:write])
    nv = length(vertices)
    vsjson = Enum.reduce(vertices, "", fn (item, acc) -> 
      vjson = vertex_to_string(item) 
      case item.id != nv - 1 do
        true -> vjson <> "," <> acc
        _ -> vjson <> acc
      end
    end)
    bsjson = 
    Enum.concat(bonds) 
    |>  Enum.reduce("", fn (item, acc) -> 
          acc <> bond_to_string(item) <> "," 
        end)
    |>  String.rstrip( ?,)

    IO.binwrite(file, "{\"vertices\":[")
    IO.binwrite(file, vsjson)
    IO.binwrite(file, "],\n")
    IO.binwrite(file, "\"bonds\":[")
    IO.binwrite(file, bsjson)
    IO.binwrite(file, "]}")
  end 

  defp vertex_to_string(v) do
    "{\"id\":" <> 
      to_string(v.id) <> 
      ",\"mass\":" <> 
      to_string(v.mass) <> 
      ",\"radius\":" <> 
      to_string(v.radius) <> 
      ",\"type\":\"" <> 
      to_string(v.type) <> 
      "\"}"
  end

  defp bond_to_string(b) do
    "{\"fst\":" <> 
      to_string(b.fst) <> 
      ",\"snd\":" <> 
      to_string(b.snd) <> 
      ",\"len\":" <> 
      to_string(b.len) <>
      "}"
  end

  def mk_vertices(0), do: []
  def mk_vertices(n) do
    [%{id: n - 1, mass: 1, radius: 1, type: "r"} | mk_vertices(n - 1)]
  end
  
  def mk_bonds(table, nv) do
    table.body
      |>  strings_to_floats
      |>  distancematrix_to_bonds(0, nv)
      |>  Enum.map(fn row -> 
            Enum.filter(row, fn(%{fst: _, len: x, snd: _}) -> 
              x < @distance_delimiter 
            end) 
          end) 
  end

  def distancematrix_to_bonds([], _, _), do: []
  def distancematrix_to_bonds([x | xs], n, nv) do
      prs = pairs(Enum.to_list(0..(nv - 1)))
      [row_to_bonds(x, prs, n, 0) | distancematrix_to_bonds(xs, n + 1, nv)]
  end
  
  def row_to_bonds([], _, _, _), do: []
  def row_to_bonds([x | xs], pairs, n, i) do
    if x < @min_dist do x = @min_dist end
    cond do 
      Enum.member?(pairs, {n, i}) ->
        [%{fst: n, snd: i, len: x} | row_to_bonds(xs, pairs, n, i + 1)] 
      true ->
        row_to_bonds(xs, pairs, n, i + 1)
    end
  end 

  def pairs([]), do: []
  def pairs(l) do
    _pairs(Enum.take(l, length(l) - 1), tl(l), tl(l))
  end

  def _pairs([], _, _), do: [] 
  def _pairs(xs, [], l) do 
    _pairs(tl(xs), tl(l), tl(l))
  end
  def _pairs(xs, ys, l) do
    [{hd(xs), hd(ys)} | _pairs(xs, tl(ys), l)]
  end

  def fst({x, _}), do: x

  def strings_to_floats(table) do
    Enum.map(
      table, 
      fn row -> Enum.map(row, fn string -> string |> Float.parse |> fst end) end
    );
  end

end

