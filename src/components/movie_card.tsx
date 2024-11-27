import { Card, Link, Typography } from "@mui/material";
import { translateGenresToString } from "../models/genres";
import { TmdbMovie } from "../models/tmdb";

export default function MovieCard(movie: Readonly<TmdbMovie>) {
  return (
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
}
