import {createPhotoDescription} from './data.js';

/*
созданиt массива из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, описание генерируются с помощю функции createPhotoDescription()
*/
// eslint-disable-next-line no-unused-expressions, no-unused-vars
const photos = Array.from({length: 25}, createPhotoDescription);
