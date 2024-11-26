import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import watchlistItems from "../public/tmdb-watchlist.json" assert { type: "json" };
import "./App.css";
import { TmdbMovie } from "./models/tmdb";

function App() {
  const items: TmdbMovie[] = watchlistItems satisfies TmdbMovie[];
  const listItems = items.sort(sortMovies).map(renderMovie);
  return (
    <React.Fragment>
      <CssBaseline />
      <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
        {listItems}
      </List>
    </React.Fragment>
  );
}

const handleListItemClick = (
  _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  movieTitle: string
) => {
  window.open(
    `https://letterboxd.com/search/films/${encodeURIComponent(
      movieTitle
    )}/?adult`,
    "_blank",
    "noopener noreferrer"
  );
};

const renderMovie = (movie: TmdbMovie) => (
  <>
    <ListItem alignItems="flex-start" data-id={movie.id}>
      <img
        srcSet={`https://image.tmdb.org/t/p/w154/${movie.poster_path}?w=154&h231&fit=crop&auto=format&dpr=2 2x`}
        src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}?w=154&h231&fit=crop&auto=format`}
        alt={movie.title}
        width="154"
        height="231"
        loading="lazy"
        style={{ border: "solid 1px #777" }}
      />
      <ListItemText
        primary={
          <React.Fragment>
            <ListItemButton
              onClick={(event) => handleListItemClick(event, movie.title)}
            >
              <Typography sx={{ textDecoration: "underline" }}>
                {movie.title}
              </Typography>
            </ListItemButton>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.primary",
                display: "block",
                marginLeft: "16px",
              }}
            >
              Release Date: {!movie.release_date ? "TBD" : movie.release_date}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.primary",
                display: "block",
                margin: "4px 0 0 16px",
              }}
            >
              {translateGenresToString(movie.genre_ids)}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" aria-hidden="true" />
  </>
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

const translateGenresToString = (genreIds: number[]) => {
  return genres
    .filter((genre) => genreIds.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");
};

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export default App;
