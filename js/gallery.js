import {drawThumbnails} from './thumbnails.js';
import {openBigPicture} from './full-screen-image.js';
import {getData} from './api.js';
//const pictures = document.querySelectorAll('.picture');

const onPictureClick = function(pic){
  document.body.classList.add('modal-open');
  openBigPicture(pic);
};

getData(drawThumbnails, onPictureClick);

