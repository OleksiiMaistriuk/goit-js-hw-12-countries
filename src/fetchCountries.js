export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      if (searchQuery) {
        return response.json();
      } else {
        return;
      }
    })
    .catch(error => console.log(error));
}
