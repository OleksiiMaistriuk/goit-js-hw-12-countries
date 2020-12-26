import './styles.css';
import countryList from '../template/countryList.hbs';
import countriesItem from '../template/countriesItem.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  countryItem: document.querySelector('.js-country-list'),
  countryConteiner: document.querySelector('.js-country-conteiner'),
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.js-search-input'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

const debounceInput = debounce(event => {
  fetchCountries(event.target.value).then(updateArticlesMurkup);
}, 500);

function clearListItems() {
  refs.countryConteiner.innerHTML = '';
  refs.countryItem.innerHTML = '';
}

refs.searchInput.addEventListener('input', debounceInput);

function addMarkup(murkup) {
  refs.countryConteiner.insertAdjacentHTML('beforeend', murkup);
}

function itemRequest(item) {
  refs.countryItem.insertAdjacentHTML('beforeend', item);
}

function updateArticlesMurkup(countries) {
  clearListItems();
  const murkup = countryList(countries);
  const item = countriesItem(countries);

  if (!countries) {
    return;
  }
  if (countries.length === 1) {
    addMarkup(murkup);
  } else if (countries.length > 1 && countries.length <= 10) {
    itemRequest(item);
  } else if (countries.length > 10) {
    resultMessage(
      error,
      'To many matches found. Please enter a more specific query!',
    );
  } else {
    clearListItems();
    resultMessage(error, 'No matches found!');
  }
}

function resultMessage(typeInfo, textInfo) {
  typeInfo({
    text: `${textInfo}`,
    delay: 1000,
    closerHover: true,
  });
}
