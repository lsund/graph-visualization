

defmodule Convert do

  def fst({x, _}), do: x

  def mk_bonds([], _), do: []
  def mk_bonds([x | xs], n) do
      [tobonds(x, n, 0) | mk_bonds(xs, n + 1)]
  end
  
  def mk_table do
    File.stream!("test.csv") 
      |> CSV.decode(separator: ?\n)
      |> rowtolist
      |> mk_bonds(0)
  end

  def rowtolist(row) do
    Enum.map(
      row, 
      fn element ->
        element 
        |> hd 
        |> String.split(",") 
        |> Enum.map fn element -> element |> Float.parse |> fst end
      end
    );
  end

  def tobonds([], _, _), do: []
  def tobonds([x | xs], n, i) do
    cond do 
      x < 0.5 ->
        [[fst: n, snd: i, len: x] | tobonds(xs, n, i + 1)] 
      true ->
        tobonds(xs, n, i + 1)
    end
  end 


  def mk_vertices(0), do: []
  def mk_vertices(n) do
    [[id: n, mass: 1, radius: 1, type: "r"] | mk_vertices(n - 1)]
  end
  

end

