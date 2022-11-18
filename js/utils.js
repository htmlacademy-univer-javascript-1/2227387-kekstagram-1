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

export {getRandom, checkStringLength, getRandomElementFrom, getRandomNoReplyElementFrom, isEscapeKey};
