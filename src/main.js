import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
let query = '';
let lightbox;

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term.' });
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'No Results',
          message: 'No images found. Please try a different search term.',
        });
      } else {
        renderImages(data.hits);
        lightbox = new SimpleLightbox('.gallery a');
      }
    })
    .catch(error => {
      iziToast.error({ title: 'Error', message: 'Failed to load images.' });
    })
    .finally(() => {
      hideLoader();
    });
});
