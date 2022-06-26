import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../app/services/Axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, isLargeRow = false, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        let response = await axios.get(fetchUrl);
        setMovies(response.data.results);
        return response;
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, [fetchUrl]);

  const baseURL = "https://image.tmdb.org/t/p/original/";

  function onPlayerReady(event) {
    var embedCode = event.target.getVideoEmbedCode();
    event.target.playVideo();
    if (document.getElementById("embed-code")) {
      document.getElementById("embed-code").innerHTML = embedCode;
    }
  }

  const opts = {
    height: "490",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => alert("Temporary Unavailable"));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__poster_large"}`}
              src={`${baseURL}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && (
        <YouTube videoId={trailerUrl} opts={opts} onReady={onPlayerReady} />
      )}
    </div>
  );
}

export default Row;
