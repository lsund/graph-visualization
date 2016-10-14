
module Main where

import System.Random.Shuffle
import System.Environment
import System.Directory

pairsUpTo :: Int -> [(Int, Int)]
pairsUpTo n = pairsUpTo' 0 1 (pred n)
    where
        pairsUpTo' :: Int -> Int -> Int -> [(Int, Int)] 
        pairsUpTo' a b max
            | a == max - 1 &&  b == max = [(a, b)]
        pairsUpTo' a b max
            | b == max = (a, b) : pairsUpTo' (a + 1) (a + 2) max
        pairsUpTo' a b max = (a, b) : pairsUpTo' a (b + 1)  max


promptMessage :: String -> String
promptMessage s = "JsonGen>> " ++ s

genVertexJSONString :: Int -> String
genVertexJSONString n = "\"vertices\": [" ++ concat (genVertexJSONString' 0 n)
    where
        jsonstring n = "{\"id\":" ++ show n ++ ",\"fixed\":null,\"label\":null}"
        genVertexJSONString' n max  
            | n == max  = [jsonstring max ++ "]"]
            | otherwise = (jsonstring n ++ ",") : genVertexJSONString' (succ n) max


genBondJSONString :: [(Int, Int)] -> String
genBondJSONString [] = ""
genBondJSONString bs = "\"bonds\": [" ++ concat (genBondJSONString' bs)
    where
        jsonstring (fst, snd)       = "{\"fst\":" ++ show fst ++ ",\"snd\":" ++ show snd ++ ",\"len\":1.0}"
        genBondJSONString' [b]      = [jsonstring b ++ "]"]
        genBondJSONString' (b : bs) = (jsonstring b ++ ",") : genBondJSONString' bs


genJSONString :: Int -> [(Int, Int)] -> String
genJSONString nv [] = "{" ++ genVertexJSONString nv ++ "}"
genJSONString nv bs = "{" ++ genVertexJSONString nv ++ "," ++ genBondJSONString bs ++ "}"


writeJSON :: FilePath -> Int -> Int -> IO ()
writeJSON fname nv nb = do
        let bonds = pairsUpTo nv
        shuffled <- shuffleM bonds 
        let somebonds = take nb shuffled
        writeFile fname (genJSONString nv somebonds) 
        putStrLn . promptMessage $ "File " ++ fname ++ " written with new json data"

checkAndWrite :: FilePath -> Int -> Int -> IO ()
checkAndWrite fname nv nb = do 
    exists <- doesFileExist fname 
    if exists then do
        putStrLn . promptMessage $ "File " ++ fname ++ " already exists. Overwrite? [y/n]"
        ans <- getLine
        case ans of
            "y" -> writeJSON fname nv nb
            "n" -> putStrLn $ promptMessage "Not overwriting this file"
            _   -> do
                putStrLn $ promptMessage "Please answer y/n"
                checkAndWrite fname nv nb
    else
        writeJSON fname nv nb

main :: IO ()
main = do
    let usage = promptMessage "Usage: genjson [outfile] [nverticies] [nbonds]\n" ++ 
                promptMessage "where nverticies is a positive integer and" ++ 
                promptMessage "nbonds is a non-negative integer that satisfies" ++ 
                promptMessage "nbonds <= nverticies - 1"
    args <- getArgs
    if length args /= 3 then 
        putStrLn usage
    else 
        let nv = read (args !! 1) :: Int
            nb = read (args !! 2) :: Int
        in
            if nb <= nv - 1 then 
                checkAndWrite (head args) nv nb
            else
                putStrLn usage

