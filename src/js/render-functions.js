export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(image => {
      return `
        <a href="${image.largeImageURL}" class="gallery__item">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
          <div class="image-info">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>`;
    })
    .join('');
  gallery.innerHTML = markup;
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('visible');
}
