const API_KEY = '45040943-e695a2a5e7ee0373bf96f3099';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
const perPage = 15;

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return await response.json();
}

export function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 1;
}
