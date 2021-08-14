'use strict';

class StringBuilder {
  constructor(baseString = '') {
    this.value = String(baseString); //Явно преобразовано к типу String, если в параметр будет передана не строка это
    // поможет избежать неожиданного результата, так как при конкатенации строк значение любого типа,
    // которое объединяется со строкой, будет автоматически преобразовано в строку и далее будет произведена конкатенация.
  }
  append(str) {
    this.value = this.value + str;
    return this; //В методе класса идёт возврат this(объекта), благодаря этому есть возможность сделать цепочку вызова,
    // так как каждый метод будет возвращать объект и запись станет равносильна builder.prepend(); builder.pad();.
  };
  prepend(str) {
    this.value = str + this.value;
    return this;
  };
  pad(str) {
    this.value = str + this.value + str;
    return this;
  }
}

export default StringBuilder

