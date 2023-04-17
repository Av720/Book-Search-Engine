export const searchGoogleBooks = (queryInput) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryInput}`);
};