# *****************************************************************************

# File Name: drugs2json.exs

# Description: 

# Creation Date: 12-07-2015

# *****************************************************************************

defmodule Drugs2json do

  @author "Ludvig Sundström"

  def run do
    {drugs, targets} = File.stream!("../data/drugbank.txt") |> 
    Stream.chunk(2) |> 
    Enum.reduce({[], []}, fn ([x, y], {xs, ys}) -> {[x | xs], [y | ys]} end)
    mk_vertices(drugs |> Enum.uniq |> length, "d")
    #targets |> Enum.uniq |> length
  end
  
  def mk_vertices(0, _), do: []
  def mk_vertices(n, t) do
    [%{id: n - 1, mass: 1, radius: 1, type: t} | mk_vertices(n - 1, t)]
  end

  # Need to produce bonds from this set, and think about how make it a little
  # smaller


end


