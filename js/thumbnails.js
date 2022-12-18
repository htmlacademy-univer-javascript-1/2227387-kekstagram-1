import {getRandomNoReplyElementFrom} from './utils.js';

//Находим нужный контейнер и шаблон.
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Фильтры
const filterElement = document.querySelector('.img-filters');

let filter = 'default';

/*
С помощью шаблона создаем новый элемент заполняем его,
вешаем на него обработчик по клику (для реализации открытия фотографии на полный экран),
в обработчик передаётся функция которая должна выполняться при клике на фотографию
*/
const drawThumbnails = function(photos, onPhotoClick, filterCallBack){
  const photosFragment = document.createDocumentFragment();
  let pictures = photos.slice();

  if (filterCallBack) {
    pictures = filterCallBack(pictures);
  }

  pictures.forEach((pic) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = pic.url;
    newPicture.querySelector('.picture__likes').textContent = pic.likes;
    newPicture.querySelector('.picture__comments').textContent = pic.comments.length;

    newPicture.addEventListener('click', () =>{
      onPhotoClick(pic);
    });

    photosFragment.append(newPicture);
  });

  //Удалим все старые миниаиюры перед добавлением новых.
  picturesContainer.querySelectorAll('.picture').forEach((oldPic) => oldPic.remove());

  picturesContainer.append(photosFragment);

  filterElement.classList.remove('img-filters--inactive');
};

const setFilterClick = function(filterName, cb){
  const filterButton = filterElement.querySelector(`#filter-${filterName}`);
  filterButton.addEventListener('click', () => {
    if(filter !== filterName) {
      const curFilterButton =  filterElement.querySelector(`#filter-${filter}`);
      curFilterButton.classList.remove('img-filters__button--active');

      filterButton.classList.add('img-filters__button--active');
      filter = filterName;
      cb();
    }
  });
};

const randomFilter = function(array){
  return Array.from({ length: 10 }, () => getRandomNoReplyElementFrom(array));
};
const discussedFilter = function(array){
  return array.sort((picsA, piscB) => piscB.comments.length - picsA.comments.length);
};

export {drawThumbnails, setFilterClick, randomFilter, discussedFilter};
