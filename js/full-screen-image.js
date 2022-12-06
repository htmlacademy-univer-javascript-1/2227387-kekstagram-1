const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const newCommentTemplate = commentList.querySelector('.social__comment');
const closeButton = bigPicture.querySelector('.big-picture__cancel');


//метод для смены информации о фотографии
const openBigPicture = function(newPicture){

  //добавим обработчики закрытия полноэкранной фотографии
  //при клике на кнопку
  closeButton.addEventListener(
    'click',
    () => {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    },
    {once: true}
  );
  //при нажатии Esc
  document.addEventListener(
    'keydown',
    (evt) => {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    },
    {once: true}
  );


  bigPicture.querySelector('img').src = newPicture.url;
  bigPicture.querySelector('.likes-count').textContent = newPicture.likes;
  bigPicture.querySelector('.social__caption').textContent = newPicture.description;

  const comments = newPicture.comments;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  //очщяем список комментариев чтобы заполнить его новыми. Источник: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }
  comments.forEach((comment) => {
    const newComment = newCommentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentList.append(newComment);
  });

  //скрытие блоков  счётчика комментариев и загрузки новых комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');


  bigPicture.classList.remove('hidden');
};

export {openBigPicture};
