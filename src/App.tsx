import Stack from "@mui/material/Stack";
import { useState } from "react";
import "./App.css";
import watchlistItems from "./assets/tmdb-watchlist.json" assert { type: "json" };
import MovieCard from "./components/movie_card";
import { TmdbMovie } from "./models/tmdb";
import { sortMoviesByReleaseDate } from "./utilities/general_utilities";

function App() {
  const [items] = useState(
    watchlistItems.toSorted(sortMoviesByReleaseDate) as TmdbMovie[],
  );

  const cards = items.map(MovieCard);

  return (
    <Stack direction="row" className="flex-wrap gap-2.5">
      {cards}
    </Stack>
  );
}

export default App;
