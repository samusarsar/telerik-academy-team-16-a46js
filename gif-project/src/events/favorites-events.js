import { getFavorite, removeFavorite, setFavorite } from '../data/favorites.js';
/**
 * Toggles favorite status for a given GIF
 * @param {*} id GIF's ID
 */
export const toggleFavoriteStatus = (id) => {
  const favorite = getFavorite();

  if (favorite === id) {
    removeFavorite();
  } else {
    setFavorite(id);
  }

  document.querySelector(`.favorite-status-container`).innerHTML = renderFavoriteStatus(id);
};

/**
 * Renders favorite status image for a given GIF
 * @param {string} id GIF's ID
 * @return {string} HTML img element
 */
export const renderFavoriteStatus = (id) => {
  const favorite = getFavorite();

  if (favorite === id) {
    return `<img src="../../images/heart-full.png" class="favorite-status" data-gif-id="${id}">`;
  } else {
    return `<img src="../../images/heart-empty.png" class="favorite-status" data-gif-id="${id}">`;
  }
};
