import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../app/services/Axios";
import requests from "../app/services/Requests";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchMovie() {
      try {
        let response = await axios.get(requests.fetchNetflixOriginals);
        console.log("[ Banner ]: fetchMovie Response = ", response.data);
        // Set random Banner movie:
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
      } catch (err) {
        console.log("[ Banner ]: fetchMovie Error = ", err);
      }
    }

    fetchMovie();
  }, []);

  console.log(movie, "movies");

  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }

  const baseURL = "https://image.tmdb.org/t/p/original/";
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.orginal_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My list</button>
        </div>
        <h1 className="banner__description">
          {truncate(
            `${movie.overview}
 `,
            150
          )}{" "}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
