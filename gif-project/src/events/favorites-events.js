import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { addFavorite, getFavorites, removeFavorite } from '../data/favorites.js';
import { q } from './helpers.js';

export const toggleFavoriteStatus = (movieId) => {
  const favorites = getFavorites();
  const heartSpan = q(`span[data-movie-id="${movieId}"]`);
  
  if (favorites.includes(movieId)) {
    removeFavorite(movieId);
    heartSpan.classList.remove('active');
    heartSpan.innerHTML = EMPTY_HEART;
    if(document.querySelector(`h1`).innerHTML === 'Favorite movies:') {
      const divMovieElement = q(`div[id="${movieId}"]`);
      divMovieElement.remove();
      if(document.getElementsByClassName('movie-simple').length === 0) {
        document.getElementsByClassName('content')[0].innerHTML = '<p>Add some movies to favorites to see them here.</p>';
      }
    }
  } else {
    addFavorite(movieId);
    heartSpan.classList.add('active');
    heartSpan.innerHTML = FULL_HEART;
  }
};

export const renderFavoriteStatus = (movieId) => {
  const favorites = getFavorites();

  return favorites.includes(movieId)
    ? `<span class="favorite active" data-movie-id="${movieId}">${FULL_HEART}</span>`
    : `<span class="favorite" data-movie-id="${movieId}">${EMPTY_HEART}</span>`;
};