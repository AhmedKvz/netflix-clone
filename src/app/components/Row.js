import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../services/Axios";

function Row({ title, isLargeRow = false, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        let response = await axios.get(fetchUrl);
        setMovies(response.data.results);
        return response;
      } catch (err) {
        console.error();
      }
    }
    fetchMovies();
  }, [fetchUrl]);
  console.log(movies, "this is moviesss");
  const baseURL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__poster_large"}`}
              src={`${baseURL}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt="movie"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
