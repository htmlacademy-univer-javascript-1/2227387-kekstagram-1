/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.

Пример использования функции:
  имя_функции(от, до);
  Результат: целое число из диапазона "от...до"

Источник:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

const getRandom = (from, to) => {
  if (from > to) {
    return -1;
  }
  const min = Math.ceil(from);
  const max = Math.floor(to);
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

const checkStringLenght = (string, maxLenght) => string.lenght <= maxLenght;

checkStringLenght('some test String with length: 32', getRandom(20, 40));
