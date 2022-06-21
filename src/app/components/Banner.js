import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../services/Axios";
import requests from "../services/Requests";

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

  console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://i.imgur.com/e1hLQ2m.png")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My list</button>
        </div>
        <h1 className="banner__description">
          {truncate(
            `this is a test descriptionthis is a test description
        this is a test description
        this is a test description
        this is a test description
        this is a test descriptionthis is a test description
        this is a test description
        this is a test description
        this is a test description
        this is a test descriptionthis is a test descriptionthis is a test description
        this is a test descriptionthis is a test description
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
