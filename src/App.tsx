import { Link } from "@mui/material";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./App.css";
import watchlistItems from "./assets/tmdb-watchlist.json" assert { type: "json" };
import { TmdbMovie } from "./models/tmdb";

function App() {
  const items: TmdbMovie[] = watchlistItems satisfies TmdbMovie[];
  const listItems = items.sort(sortMovies).map(renderMovie);
  return (
    <>
      <CssBaseline />
      <Stack direction="row" className="flex-wrap gap-2.5">
        {listItems}
      </Stack>
    </>
  );
}

const renderMovie = (movie: TmdbMovie) => (
  <Card className="text-center w-52">
    <img
      srcSet={`https://image.tmdb.org/t/p/w154/${movie.poster_path}?w=154&h231&fit=crop&auto=format&dpr=2 2x`}
      src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}?w=154&h231&fit=crop&auto=format`}
      alt={movie.title}
      title={movie.title}
      width="154"
      height="231"
      loading="lazy"
      className="place-self-center border border-solid border-gray-500"
    />
    <Link
      href={`https://letterboxd.com/search/films/${encodeURIComponent(
        movie.title,
      )}/?adult`}
      underline="always"
      target="_blank"
      rel="noopener noreferrer"
    >
      {movie.title}
    </Link>
    <Typography
      component="div"
      variant="body2"
      sx={{
        color: "text.primary",
      }}
    >
      {!movie.release_date ? "TBD" : movie.release_date}
    </Typography>
    <Typography
      component="div"
      variant="body2"
      sx={{
        color: "text.primary",
      }}
    >
      {translateGenresToString(movie.genre_ids)}
    </Typography>
  </Card>
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
