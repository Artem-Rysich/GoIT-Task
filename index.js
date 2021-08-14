'use strict';
import debounce from 'lodash.debounce';
import StringBuilder from './js/task1/stringBuilder';
import {handlerCreateBoxes, handlerDestroyBoxes} from './js/task2/createBoxes';
import searchImg from './js/task3/searchImg';

const input = document.querySelector('.js-input');
const buttonCreate = document.querySelector('[data-action="create"]');
const buttonDestroy = document.querySelector('[data-action="destroy"]');
const inputSearchImg = document.querySelector('input[name = "query"]');

//Task 1
const builder = new StringBuilder('.');
builder
  .append('^')
  .prepend('^')
  .pad('=');
console.log(builder);

//Task 2
input.addEventListener('keydown', handlerCreateBoxes);
buttonCreate.addEventListener('click', handlerCreateBoxes);
buttonDestroy.addEventListener('click', handlerDestroyBoxes);

//Task 3
inputSearchImg.addEventListener('input', debounce(searchImg, 1000));