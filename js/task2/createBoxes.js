const input = document.querySelector('.js-input'); // Получаем DOM элемент input c помощью querySelector через селектор className (js-input).
const buttonCreate = document.querySelector('[data-action="create"]') // Получаем DOM элемент button c помощью querySelector через селектор data-attribute (create).
const container = document.querySelector('#boxes'); // Получаем DOM элемент div c помощью querySelector через селектор ID (boxes).

let boxesArray = []; // Создаём пустой массив, в который будем помещать наши div элементи.
let elementDivSize = 20; // Создаём внешнюю переменую и задаём базовый размер элемента div который будет ДО ЕГО ПЕРВОГО СОЗДАНИЯ, при последующих созданиях элементов переменая будет в себе хранить размер предыдуего элемента.

function handlerCreateBoxes(event) {
  const enter = event.keyCode === 13; // Присваиваем переменной boolean значение результата строгого сравнения кода нажатой клавиши с кодом клавиши Enter.
  const clickCreate = event.target === buttonCreate; // Присваиваем переменной boolean значение, true если evnt был вызван кликом по кнопке Создать.
  if (enter || clickCreate) { // Делаем проверку с помощьь логического оператора ИЛИ. Проверяем или пользователь нажал Enter или кликнул на кнопку Создать.
    const currentValue = Number(input.value); // Создаём переменую и присваеваем ей значение инпута перобразованного к числу(так как инпут возвращет строку), хотя и с строкой будет работать.
    createBoxes(currentValue);
    input.value = ''; // Очищаем инпут.
  }
}

function handlerDestroyBoxes() {
  destroyBoxes();
  input.value = '';
}

function createBoxes(ammount) {
  for (let i = 0; i < ammount; i += 1) { // Создаём цикл который будет выполняться то количество раз сколько указано в ammount
    const div = createDiv(); // Создаём дополнительную переменную для лучшей читабельности кода.
    boxesArray.push(div); // Методом push добавляем в конец масива создание элементы div.
  }
  createMarkup(boxesArray);
}

function destroyBoxes() {
  container.innerHTML = ''; // Очищаем наш контейнер от дочерних элементов.
  boxesArray.splice(0, boxesArray.length); // Очищаем массив.
  elementDivSize = 20; // Возвращаем начальное значение.
}

function createDiv() {
  const elementDiv = document.createElement('div'); // Создаем наш элемент div
  elementDivSize += 10; // При каждом вызове функции переменная будет увеличивать своё значение на 10
  elementDiv.style.width = elementDivSize + 'px'; // Задаём ширину элемента и с помощью конкатенации преобразовать значение в строку.
  elementDiv.style.height = elementDivSize + 'px'; // Задаём высоту элемента и с помощью конкатенации преобразовать значение в строку.
  elementDiv.style.backgroundColor = getRandomRGBColor();
  return elementDiv;
}

function createMarkup(arr) {
  const fragment = document.createDocumentFragment(); // Создаём DocumentFragment.
  arr.forEach(element => { // Перебираем массив и на каждой итерации добавляем элемент в наш DocumentFragment.
    fragment.append(element); // Tак как DocumentFragment не является частью основного DOM дерева, добавление в него дочерних элементов не вызывает reflow.
  });
  container.append(fragment); // При добавлении DocumentFragment к DOM дереву он заменяеться на свои дочерние элементы.
}

function getRandomRGBColor() {
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();
  const rgb = `rgb(${r},${g},${b})`; // С помощью интерполяции формируем строку подобную формату RGB и подставляем в неё переменые.
  return rgb;
}

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 256); // Получаем целое число от 0 до 255.
  return randomNumber;
}

export {
  handlerCreateBoxes,
  handlerDestroyBoxes
};