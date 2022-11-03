import {createPhotoDescription} from './data.js';

/*
созданиt массива из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, описание генерируются с помощю функции createPhotoDescription()
*/
const photos = Array.from({length: 25}, createPhotoDescription);

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

photos.forEach(({url, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;

  pictureContainer.append(newPicture);
});
