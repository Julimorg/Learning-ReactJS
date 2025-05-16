import { useState, useEffect } from "react";
import "../DemoUsePopCorn/style.css";

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

  const tempQuery = "interstellar";

  function handleSelectMovie(id) {
    setSelectId(selectId => id === selectId ? null : id);
  }
  function hanldeCloseMovie() {
    setSelectId(null);
  }

  //? fetch movie
  useEffect(
    function () {
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
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
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
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
function Loader() {
  return <p className="loader"> loading.... </p>;
}
function NumResults({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}
function SearchMovies({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}
function Logo() {
  return (
    <>
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}
function NavbarHeader({ children }) {
  return (
    <>
      <nav className="nav-bar">{children}</nav>
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

function MovieDetails({ selectedId, onCloseMovies }) {
  return (
    <>
      <div className="details">
        <button className="btn-black" onClick={onCloseMovies}>
          &larr;
        </button>
        {selectedId}
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

function WatchMovieList({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
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
