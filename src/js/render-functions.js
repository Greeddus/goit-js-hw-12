import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <a href="${largeImageURL}" class="gallery__item">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes</b> ${likes}</p>
        <p class="info-item"><b>Views</b> ${views}</p>
        <p class="info-item"><b>Comments</b> ${comments}</p>
        <p class="info-item"><b>Downloads</b> ${downloads}</p>
      </div>
    </a>
  `;
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.add('hidden');
}

export function showEndOfCollectionMessage() {
  const endMessage = document.querySelector('.end-of-collection');
  endMessage.classList.remove('hidden');
}

export function hideEndOfCollectionMessage() {
  const endMessage = document.querySelector('.end-of-collection');
  endMessage.classList.add('hidden');
}

export function showLoadingSpinner() {
  const spinner = document.querySelector('#loader');
  spinner.style.display = 'block';
}

export function hideLoadingSpinner() {
  const spinner = document.querySelector('#loader');
  spinner.style.display = 'none';
}
