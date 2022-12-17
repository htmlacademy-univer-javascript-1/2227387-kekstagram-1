const ALERT_SHOW_TIME = 7000;

/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.

Пример использования функции:
  имя_функции(от, до);
  Результат: целое число из диапазона "от...до"

Источник:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

const getRandom = (from, to) => {

  const min = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const max = Math.floor(Math.max(Math.abs(from), Math.abs(to)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
Функция для проверки максимальной длины строки.

Пример использования функции:
имя_функции(проверяемая_строка, максимальная_длина);
  Результат:
    true, если строка проходит по длине,
    false — если не проходит

*/

const checkStringLength = (string, maxLength) => string.length <= maxLength;


/*
функция возвращяющая случайный элемент из массива arrayOfElements

Пример использования функции:
  getRandomElementFrom([one, two]);
  Результат: one или two

*/
const getRandomElementFrom = (arrayOfElements) => arrayOfElements[getRandom(0, arrayOfElements.length - 1)];

/*
Функция возвращяющая случайный элемент из массива arrayOfElements без повторений при повторном вызове
на этом же массиве. После каждого вызова ф-ии массив будет изменен.

Пример использования функции:
  const arr = [one, two, three];
  getRandomNoReplyElementFrom(arr);
  Результат: two                    //arr = [one, three]
  getRandomNoReplyElementFrom(arr);
  Результат: one                    //arr = [three]

*/
const getRandomNoReplyElementFrom = function(arrayOfElements) {
  const element = getRandomElementFrom(arrayOfElements);
  arrayOfElements.splice(arrayOfElements.indexOf(element), 1);
  return element;
};


/*
Функция возвращяет true если событие (evt) было вызвано нажатием клавиши Escape и false в остальных случаях.
*/
const isEscapeKey = (evt) => evt.key === 'Escape';

/*
Функция возвращяет параметры для slider'а в зависимости от имени эффекта.
*/
const getParamsForEffect = (effect) =>{
  switch(effect) {
    case 'chrome':
      return [0, 1, 0.1, 'grayscale', ''];

    case 'sepia':
      return [0, 1, 0.1, 'sepia', ''];

    case 'marvin':
      return [0, 100, 1, 'invert', '%'];

    case 'phobos':
      return [0, 3, 0.1, 'blur', 'px'];

    case 'heat':
      return [1, 3, 0.1, 'brightness', ''];

    default:
      return [0, 1, 0.1, '', ''];
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandom, checkStringLength, getRandomElementFrom, getRandomNoReplyElementFrom, isEscapeKey, getParamsForEffect, showAlert};
