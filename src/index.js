import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const serchCountryInput = document.querySelector('#search-box');
const serchResultList = document.querySelector('.country-list');
const serchResultOne = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 1000;

serchCountryInput.addEventListener(
  'input',
  debounce(inputHandler, `${DEBOUNCE_DELAY}`)
);

function inputHandler(event) {
  serchResultList.innerHTML = '';
  serchResultOne.innerHTML = '';

  const countryName = event.target.value.trim();
  if (!countryName) {
    return;
  }
  fetchCountries(countryName)
    .then(res => {
      console.log(res);
      // >10 notification
      if (res.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      // 1
      // createSingleCountryMarkup(res[0])
      if (res.length === 1) {
        createSingleCountryMarkup(res[0]);
        return
      }

      createMultipleCountriesMarkup(res);
    })
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createSingleCountryMarkup(countryInfo) {
  console.log(countryInfo);

  const markup = `
  <img src = ${countryInfo.flags.svg} width = 50 height = 50 ><h1>${
    countryInfo.name.official
  }</h1><p>Capital: ${countryInfo.capital}<p>
  </p>Population: ${
    countryInfo.population
  }<p>
  </p>Languages: ${Object.values(countryInfo.languages).join(', ')}<p></p>
  `;

  serchResultOne.insertAdjacentHTML('beforeend', markup);
}

function createMultipleCountriesMarkup(countries) {
  const markup = countries.map( country => `<li><img src = ${country.flags.svg} width = 50 height = 50 ><h1>${
    country.name.official
  }</h1></li>`)
  serchResultList.insertAdjacentHTML('afterbegin', markup.join(''));
};