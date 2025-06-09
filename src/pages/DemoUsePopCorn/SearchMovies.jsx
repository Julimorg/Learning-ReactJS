import React, { useEffect } from "react";
import { useRef } from "react";

function SearchMovies({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(function(){
    console.log(inputEl.current);
    inputEl.current.focus();
},[]);
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref = {inputEl}
      />
    </>
  );
}

export default SearchMovies;