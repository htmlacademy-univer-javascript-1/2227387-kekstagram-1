//Находим нужный контейнер и шаблон.
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/*
С помощью шаблона создаем новый жлемент заполняем его,
вешаем на него обработчик по клику (для реализации открытия фотографии на полный экран),
в обработчик передаётся функция которая должна выполняться при клике на фотографию
*/
const drawThumbnails = function(photos, onPhotoClick){
  photos.forEach((pic) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = pic.url;
    newPicture.querySelector('.picture__likes').textContent = pic.likes;
    newPicture.querySelector('.picture__comments').textContent = pic.comments.length;

    newPicture.addEventListener('click', () =>{
      onPhotoClick(pic);
    });

    pictureContainer.append(newPicture);
  });
};

export {drawThumbnails};
