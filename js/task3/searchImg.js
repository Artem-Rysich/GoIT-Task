'use strict';
import template from '../../templates/template.hbs';
import * as basicLightbox from 'basicLightbox';
import apiService from "./apiService.js";
import '../../style/style.css';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

const input = document.querySelector('input[name = "query"]'); // Получаем DOM элемент input c помощью querySelector через тег input и атрибут name.
const gallery = document.querySelector('.js-gallery'); // Получаем DOM элемент ul c помощью querySelector через селектор className (js-gallery).
const target = document.querySelector('.js-target'); // Получаем DOM элемент div c помощью querySelector через селектор className (js-target).
const body = document.body; // Получаем DOM элемент div c помощью querySelector через селектор className (js-target).
const key = '16360208-b38b3071e12220d724142a6b1'; // Ключ предоставлений сервисом Pixabay API.
const numberOfResults = 20; //Указываем сколько элементов приходит за один ответ от Pixabay. (можно было не задавать так как по умолчанию в Pixabay тоже стоит 20).
const options = { // Список обций для IntersectionObserver.
  root: null,
  rootMargin: '300px',
  threshold: 1
};
const observer = new IntersectionObserver(updateList, options) //Создаём экземпляр класса IntersectionObserver и передаём в него callback и список опций.
let lastSelectedElement = null;
let numberOfPage;
let searchQuery;
let instance;

gallery.addEventListener('click', openModal);

function searchImg() {
  gallery.innerHTML = ''; // удаляем в DOM карточки с изображеиями с списка, используеться при повторном поиске изображений. 
  searchQuery = input.value; // присваеваем переменой значение c input.
  observer.unobserve(target)  //  отменяем слижение обзервера за элементом.
  numberOfPage = 1; // сбрасиваем страницу запроса, используеться при повторном поиске изображений.
  if (searchQuery !== '') { // проверяем или пользователь ввёл какое то значение в input.
    apiService(key, searchQuery, numberOfResults, numberOfPage) // делаем вызов функции с запросом на Pixabay передавая необходимые аргументы.
      .then(data => { // обрабатываем ответ с Pixabay с подальшей вставкой  элементов в DOM с помощью шаблона
        gallery.insertAdjacentHTML('beforeend', template(data));
        observer.observe(target); // активируем observer и назначаем элемент за которым следить.
      });
  };
}

function openModal(event) {
  (lastSelectedElement !== null) ? lastSelectedElement.removeAttribute('select'): false; // проверяем или последний выбраний элемент не равен null и если не равен убираем у него дата атрибут, используеться при повторном запросе на Pixabay API
  body.removeEventListener('keydown', controlModal); // снимаем слушателя событий с body.
  const isIMG = event.target.tagName === 'IMG'; // создаём и присваиваем переменной значение сравнения или пользователь действительно выбран элемент с тегом img.
  if (isIMG) {
    const currentImg = event.target;// создаём и присваиваем переменной выбраный элемент.
    body.addEventListener('keydown', controlModal); // добавляем на body слушатель событий для расширения возможностей плагина basicLightbox.
    createModal(currentImg);
  };
}

function createModal(item) {
  item.setAttribute('select', true); // добавляем на выбранный элемент дата-атрибут.
  lastSelectedElement = item;// присваиваем внешней переменной значение выбранного элемента.
  instance = basicLightbox.create(`<img src="${item.srcset}" width="800" height="600">`);// создаём модальноё окно и передать в него значение srcset выбранного эелемента. 
  return instance.show(); // на модальном окне вызываем метод show который рендерит и открывает его.
}

function controlModal(event) {
  const allImg = document.querySelectorAll('.js-img');// используя querySelectorAll получаем псевдомассив элементов с классом (js-img).
  const escape = event.keyCode === 27;// создаём и присваиваем переменной boolean значение сравнения нажатой клавиши и кода клавиши escape.
  const arrowRight = event.keyCode === 39;// создаём и присваиваем переменной boolean значение сравнения нажатой клавиши и кода клавиши Arrow right.
  const arrowLeft = event.keyCode === 37;// создаём и присваиваем переменной boolean значение сравнения нажатой клавиши и кода клавиши Arrow left.
  const isOpenModal = instance.visible()// создаём и присваиваем переменной boolean значение или открытое модальное окно.
  if (escape) {
    instance.close();// на модальном окне вызываем метод close который удаляет и закрывает модальное окно.
    body.removeEventListener('keydown', controlModal); //снимаем слушателя событий с body.
  };
  if (isOpenModal) {
    if (arrowRight) {
      const currentIdx = Array.from(allImg).findIndex(elementSelected);// преобразовываем псевдомассив в массив и находим индекс выбранного элемента.
      const nextIdx = currentIdx + 1; // к текущему индексу элемента добавляем 1 чтобы получить следующий элемент.
      (nextIdx < allImg.length) ? createModal(allImg[nextIdx]): false; // сравнение если индекс следующего эелемента меньше длинны массива всех элементов то создаём новое модальное окно и передаём в него следующий элемент.
    };
    if (arrowLeft) {
      const currentIdx = Array.from(allImg).findIndex(elementSelected);//преобразовываем псевдомассив в массив и находим индекс выбранного элемента
      const prevIdx = currentIdx - 1;//от текущего индекса элемента отнимаем 1 чтобы получить предыдущий элемент элемент.
      (prevIdx > -1) ? createModal(allImg[prevIdx]): false;// сравнение если индекс предыдущего эелемента больше -1 то создаём новое модальное окно и передаём в него предыдущий элемент.
    };
  } else {
    body.removeEventListener('keydown', controlModal); //снимаем слушателя событий с body.
  };
}

function elementSelected(element) {
  const isSelected = element.hasAttribute('select');// создаём переменную и присваиваем в неё bollean значение того или элемент имеет атрибут select.
  if (isSelected) {
    element.removeAttribute('select');// удаляем с элемента атрибут select.
    instance.close();// закрываем модальное окно.
    return element;
  }
}

function updateList(entries) {
  console.log(entries);
  entries.forEach(entry => {// перебираем масив объектов IntersectionObserver.
    if (entry.isIntersecting) {// если значение объекта isIntersecting  = true, выполняем следующий код.
      numberOfPage += 1;// увеличиваем на 1 значение текущей страницы запроса.
      apiService(key, searchQuery, numberOfResults, numberOfPage).then(data =>
        gallery.insertAdjacentHTML('beforeend', template(data))
      );
    };
  });
}

export default searchImg;