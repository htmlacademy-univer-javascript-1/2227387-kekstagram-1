import {drawThumbnails} from './thumbnails.js';
import {changeBigPicture} from './full-screen-image.js';
//const pictures = document.querySelectorAll('.picture');

const onClick = function(pic){
  document.body.classList.add('modal-open');
  changeBigPicture(pic);

};

drawThumbnails(onClick);
