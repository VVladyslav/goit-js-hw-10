export const fetchCountries = function (countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error();
    })
};
