import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import watchlistItems from "../public/tmdb-watchlist.json" assert { type: "json" };
import "./App.css";
import { TmdbMovie } from "./models/tmdb";

function App() {
  const items: TmdbMovie[] = watchlistItems satisfies TmdbMovie[];
  const listItems = items.sort(sortMovies).map(renderMovie);

  if (!items || items.length === 0) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>No movies</div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>{listItems}</div>
      </React.Fragment>
    );
  }
}

const renderMovie = (movie: TmdbMovie) => (
  <div key={movie.id} id={movie.id.toString()}>
    <img
      src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
      width="92"
    ></img>
    <div>
      {movie.title} (
      {!movie.release_date ? "TBD" : movie.release_date.substring(0, 4)})
    </div>
  </div>
);

const sortMovies = (aMovie: TmdbMovie, bMovie: TmdbMovie): 0 | 1 | -1 => {
  if (!aMovie.release_date) {
    return 1;
  } else if (!bMovie.release_date) {
    return -1;
  }

  if (aMovie.release_date < bMovie.release_date) {
    return -1;
  } else if (aMovie.release_date > bMovie.release_date) {
    return 1;
  }

  return 0;
};

export default App;
