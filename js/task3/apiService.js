'use strict';
async function apiServece(key, searchQuery, numberOfResults, numberOfPage) {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${searchQuery}&per_page=${numberOfResults}&page=${numberOfPage}`)
      .then(response => response.json());
    return response;
  } catch (error) {
    console.error(error);
  };
}
export default apiServece;