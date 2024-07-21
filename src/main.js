import { fetchImages, incrementPage, resetPage } from './js/pixabay-api';
import {
  renderImages,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfCollectionMessage,
  hideEndOfCollectionMessage,
  showLoadingSpinner,
  hideLoadingSpinner,
  showError,
} from './js/render-functions';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (query === '') {
    showError('Please enter a search term');
    return;
  }

  resetPage();
  gallery.innerHTML = '';
  hideEndOfCollectionMessage();
  hideLoadMoreButton();
  showLoadingSpinner();

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(data.hits);
      if (data.totalHits > 15) {
        showLoadMoreButton();
      }
      if (data.totalHits <= 15) {
        hideLoadMoreButton();
        showEndOfCollectionMessage();
      }
    }
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoadingSpinner();
  }
});

loadMoreButton.addEventListener('click', async () => {
  incrementPage();
  showLoadingSpinner();

  try {
    const query = searchInput.value.trim();
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      hideLoadMoreButton();
      showEndOfCollectionMessage();
    } else {
      renderImages(data.hits);
      scrollToLoadMore();
      if (data.hits.length < 15) {
        hideLoadMoreButton();
        showEndOfCollectionMessage();
      }
    }
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoadingSpinner();
  }
});

function scrollToLoadMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery__item')
    .getBoundingClientRect();
  window.scrollBy({
    top: 2 * cardHeight,
    behavior: 'smooth',
  });
}
