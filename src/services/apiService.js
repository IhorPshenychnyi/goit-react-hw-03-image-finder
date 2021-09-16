const API_KEY = '22580810-f54a4b0451f19078aae6377b4';
const BASE_URL = 'https://pixabay.com/api/';

function fetchGallery(name, page) {
  const url = `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Not found ${name}`));
  });
}

const api = { fetchGallery };

export default api;
