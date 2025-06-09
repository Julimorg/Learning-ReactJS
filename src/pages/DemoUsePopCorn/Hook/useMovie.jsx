import {useState, useEffect} from "react";

export function useMovie(query){
    const KEY = "f6f97b28";
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
     useEffect(
    function () {

      const controller = new AbortController();

      async function fetchMovies() {
        if (!query.trim()) {
          setMovies([]);
          setError("");
          setIsLoading(false);
          return;
        }

        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,

            {signal: controller.signal}
          );

          if (!res.ok)
            throw new Error("Something went wrong! with fetching movie");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not Found");

          setMovies(data.Search);
          console.log(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);

          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      fetchMovies();

      return function(){
        controller.abort();
      }
    },
    [query]
  );


  return {movies, isLoading, error};
}