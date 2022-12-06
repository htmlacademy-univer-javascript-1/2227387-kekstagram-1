import {drawThumbnails} from './thumbnails.js';
import {openBigPicture} from './full-screen-image.js';
//const pictures = document.querySelectorAll('.picture');

const onPictureClick = function(pic){
  document.body.classList.add('modal-open');
  openBigPicture(pic);

};

drawThumbnails(onPictureClick);
