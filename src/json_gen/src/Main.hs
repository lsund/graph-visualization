
module Main where

import System.Random.Shuffle
import System.Environment
import System.Directory

genVertexJsonString :: Int -> String
genVertexJsonString n = "\"vertices\": [" ++ concat (genVertexJsonString' n)
    where
        jsonstring n = "{\"id\":" ++ show n ++ ",\"fixed\":null,\"label\":null,\"type\":\"r\"}"
        genVertexJsonString' 1  = [jsonstring 0 ++ "]"]
        genVertexJsonString' n  = (jsonstring (pred n) ++ ",") : genVertexJsonString' (pred n)


genBondJsonString :: [(Int, Int)] -> String
genBondJsonString bs = "\"bonds\": [" ++ concat (genBondJsonString' bs)
    where
        jsonstring (fst, snd)       = "{\"fst\":" ++ show fst ++ ",\"snd\":" ++ show snd ++ ",\"len\":1}"
        genBondJsonString' [b]      = [jsonstring b ++ "]"]
        genBondJsonString' (b : bs) = (jsonstring b ++ ",") : genBondJsonString' bs

pairsUpTo :: Int -> [(Int, Int)]
pairsUpTo n = pairsUpTo' 0 1 (pred n)
    where
        pairsUpTo' :: Int -> Int -> Int -> [(Int, Int)] 
        pairsUpTo' a b max
            | a == max - 1 &&  b == max = [(a, b)]
        pairsUpTo' a b max
            | b == max = (a, b) : pairsUpTo' (a + 1) (a + 2) max
        pairsUpTo' a b max = (a, b) : pairsUpTo' a (b + 1)  max


genJsonString :: Int -> [(Int, Int)] -> String
genJsonString nv bs = "{" ++ genVertexJsonString nv ++ "," ++ genBondJsonString bs ++ "}"

main :: IO ()
main = do
    args <- getArgs
    if length args /= 1 then 
        putStrLn "Usage: genjson [outfile]"
    else do
        let fname = head args
        exists <- doesFileExist fname 
        if exists then do
                let nv = 10
                    nb = 5
                    bonds = pairsUpTo nv
                shuffled <- shuffleM bonds 
                let somebonds = take nb shuffled
                writeFile "data.json" (genJsonString nv somebonds) 
                putStrLn $ "File " ++ fname ++ " written with new json data"
        else
            putStrLn $ "cant find " ++ fname ++ " in current directory"

