import './sass/main.scss';
import debounce from 'lodash.debounce';
import axios from 'axios';
import markupList from './templates/markupList.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { success, error } from '@pnotify/core';

let search = '';
let page = 1;

const inputRef = document.querySelector('input');
const listRef = document.querySelector('.gallery');
const btnRef = document.querySelector('.btn');

inputRef.addEventListener('input', debounce(InputRefHandler, 500));
btnRef.addEventListener('click', btnRefHandler);

function InputRefHandler(event) {
  search = event.target.value;

  listRef.innerHTML = '';
  // inputRef.reset();

  createCard(search);
}

function btnRefHandler(event) {
  page += 1;
  createCard(search, page);
}

axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

const createCard = async (search, page = 1) => {
  try {
    throw error;
    const key = '24996447-08cefc65ed9adacdd5c87d0b0';
    const {
      data: { hits },
    } = await axios.get(`/&q=${search}&page=${page}&per_page=12&key=${key}`);
    console.dir(hits);

    const markup = markupList(hits);
    listRef.insertAdjacentHTML('beforeend', markup);

    success({
      text: `Найдено по запросу : ${search}`,
    });

    return hits;
  } catch {
    error({
      text: `Ошибка`,
    });
  }
};
