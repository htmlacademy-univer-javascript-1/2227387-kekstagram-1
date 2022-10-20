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

checkStringLength('some test String with length: 32', getRandom(20, 40));

// Массив вида [1,2,3...23,24] для генерации Id
const ID_ARRAY = Array.from({ length: 25 }, (_, i) => i+1);

// Массив вида [1,2,3...23,24] для генерации URL
const URL_ID_ARRAY = Array.from({ length: 25 }, (_, i) => i+1);

// Массив строк для генерации описания фотографии]
const DESCRIPTION_ARRAY = [
  'Погулял',
  'Смотрите что получилось',
  '-- Тут должно быть смешное описание к фото --',
  'Решил разбавить свой Кекстаграм',
  'кто вообще читает описание ?',
  'Красота! Ляпота!!',
  'Это я сфотографировал!!!',
];

// Массив строк для генерации текста комментария]
const MESSAGE_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив строк для генерации имени комментатора]
const NAME_ARRAY = [
  'Константин', 'Елена', 'Катя', 'Захар',
  'Света', 'Илья', 'Дарья', 'Алексей',
  'Елизавета', 'Владислав', 'Таина', 'Артём',
  'Полина', 'Дмитрий', 'Мария', 'Святослав',
  'Валерия', 'Фёдор', 'София', 'Евгений',
  'Семён', 'Ростислав', 'Максим', 'Ronaldo',

];

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
Функция для создания объекта комментария вида
{
  id: случайное число. Идентификаторы не повторяются,

  avatar: строка(адрес картинки) вида 'img/avatar-{N}.svg', где {N} -
          это число от 1 до 6,

  message: строка - текст комментария,

  name: строка - имя Пользователя, оставившего комментарий,
}

Пример использования функции:
  com1 = createComment();
  Результат: com = {
    id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Захар',
  }
*/
const createComment = function() {
  return {
    id: getRandom(0,50000),
    avatar: `img/avatar-${getRandom(1,6)}.svg`,
    message: getRandomElementFrom(MESSAGE_ARRAY),
    name: getRandomElementFrom(NAME_ARRAY)
  };
};

/*
Функция для создания массива из n случайно сгенерированных комментариев, комментариии генерируются
с помощю функции createComment()
*/
const createComments = (n) => Array.from({ length: n }, createComment);

/*
Функция для создания описания фотографии, опубликованной пользователем, вида:
  {
    id: число от 1 до 25. Идентификаторы не повторяются,

    url: строка(адрес картинки) вида 'photos/{I}.jpg', где {i} — это число
      от 1 до 25. Адреса картинок не повторяются,

    description: строка — описание фотографии,

    likes: число — количество лайков,

    comments: массив объектов(список комментариев) вида:
      {
        id: случайное число. Идентификаторы не повторяются,

        avatar: строка(адрес картинки) вида 'img/avatar-{N}.svg', где {N} -
          это число от 1 до 6,

        message: строка - текст комментария,

        name: строка - имя Пользователя, оставившего комментарий,
      }
  }

*/
const createPhotoDescription = function() {
  return {
    id: getRandomNoReplyElementFrom(ID_ARRAY),
    url:`photos/${getRandomNoReplyElementFrom(URL_ID_ARRAY)}.jpg`,
    description:getRandomElementFrom(DESCRIPTION_ARRAY),
    likes: getRandom(15, 200),
    comments: createComments(getRandom(1,5))
  };
};


/*
созданиt массива из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, описание генерируются с помощю функции createPhotoDescription()
*/
// eslint-disable-next-line no-unused-expressions, no-unused-vars
const photos = Array.from({length: 25}, createPhotoDescription);
