import axios from 'axios';
import { apiKey } from '../constants';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const moviceDetailsEndPoint = (movie_id) =>
  `${apiBaseUrl}/movie/${movie_id}?api_key=${apiKey}`;

const movieCreditsEndPoint = (movie_id) =>
  `${apiBaseUrl}/movie/${movie_id}/credits?api_key=${apiKey}`;

const similarMovicesEndPoint = (movie_id) =>
  `${apiBaseUrl}/movie/${movie_id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = (person_id) =>
  `${apiBaseUrl}/person/${person_id}?api_key=${apiKey}`;

const personMoviesEndpoint = (person_id) =>
  `${apiBaseUrl}/person/${person_id}/movie_credits?api_key=${apiKey}`;

const searchMoviesEndpoint = (qry) =>
  `${apiBaseUrl}/search/movie?query=${qry}&api_key=${apiKey}`;

const apiCall = async (endpoint, params = {}) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params,
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log('Error:', error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

export const fetchMovieDetails = (id) => {
  return apiCall(moviceDetailsEndPoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};

export const fetchSimilarMovie = (id) => {
  return apiCall(similarMovicesEndPoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchSearchMovies = (qry) => {
  return apiCall(searchMoviesEndpoint(qry));
};
