import { useState, useEffect } from "react";
// import "../DemoUsePopCorn/style.css";
import StarRating from "../DemoUsePopCorn/StartRating";
import ErrorMessage from "./Components/ErrorMessage";
import Loader from "./Components/Loader";
import NumResults from "./Components/NumResult";
import SearchMovies from "./SearchMovies";
import Logo from "./Components/Logo";
import NavbarHeader from "./Components/NavbarHeader";
const KEY = "f6f97b28";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function UsePopCorn() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectId, setSelectId] = useState(null);

  function handleSelectMovie(id) {
    setSelectId((selectId) => (id === selectId ? null : id));
  }
  function hanldeCloseMovie() {
    setSelectId(null);
  }
  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imbdID !== id));
  }
  //? fetch movie
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

  return (
    <>
      <NavbarHeader>
        <Logo />
        <SearchMovies query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavbarHeader>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}

          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}

          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectId ? (
            <MovieDetails
              selectedId={selectId}
              onCloseMovies={hanldeCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <>
      <li
        onClick={() => {
          onSelectMovie(movie.imdbID);
        }}
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}
function MovieList({ movies, onSelectMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
      ;
    </>
  );
}

function MovieDetails({ selectedId, onCloseMovies, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserrating = watched.find(
    (movie) => movie.imbdID == selectedId
  )?.userRating;

  console.log(watchedUserrating);
  console.log(isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovies();
  }

  useEffect(
    function () {
      
    
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function(){
      if(!title) return;
      document.title = `Movie | ${title}`;

      return function(){
        document.title = 'usePopcorn';
        console.log(`Clean up effect for movie ${title}`);
      }
    }
  ,[title]);

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-black" onClick={onCloseMovies}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime} - {year}
                </p>
                <p>{genre}</p>
                <p>{imdbRating} rating</p>
              </div>
            </header>
            <section>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p> You rated with movie {watchedUserrating}</p>
              )}

              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directerd by {director}</p>
            </section>
            {selectedId}
          </>
        )}
      </div>
    </>
  );
}

function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}

function WatchMovieList({ watched, onDeleteWatched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imbdID)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}

// function WatchBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <WatchSummary watched={watched} />

//             <WatchMovieList watched={watched} />
//           </>
//         )}
//       </div>
//     </>
//   );
// }
function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}
