const API_KEY = '46848734-31deafc513cc7a3bd94f1beea';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1) {
  if (!query) {
    console.error('Search query is empty');
    return Promise.reject(new Error('Search query is empty'));
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        console.warn('No images found for the query');
      }
      console.log('Fetched data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
