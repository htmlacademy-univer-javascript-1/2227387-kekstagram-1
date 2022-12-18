import {drawThumbnails, setFilterClick, randomFilter, discussedFilter} from './thumbnails.js';
import {openBigPicture} from './full-screen-image.js';
import {getData} from './api.js';
import {debounce} from './utils.js';
//const pictures = document.querySelectorAll('.picture');

const RERENDER_DELAY = 500;

const onPictureClick = function(pic){
  document.body.classList.add('modal-open');
  openBigPicture(pic);
};

getData((pics, cb) => {

  drawThumbnails(pics, cb);

  setFilterClick('default', debounce(
    () => drawThumbnails(pics, cb),
    RERENDER_DELAY,
  ));

  setFilterClick('random', debounce(
    () => drawThumbnails(pics, cb, randomFilter),
    RERENDER_DELAY,
  ));

  setFilterClick('discussed', debounce(
    () => drawThumbnails(pics, cb, discussedFilter),
    RERENDER_DELAY,
  ));
}, onPictureClick);

