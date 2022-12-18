import {isEscapeKey} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');

const commentListElement = bigPictureElement.querySelector('.social__comments');
const newCommentTemplate = commentListElement.querySelector('.social__comment');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const allcommentsValueElement = bigPictureElement.querySelector('.comments-count');

const commentLoadButton = bigPictureElement.querySelector('.comments-loader');
const loadMoreCommentsButton = bigPictureElement.querySelector('.social__comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const MORE_COMMENT_LOAD_VALUE = 5;

let comments;
let commentsCountValue;


const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onPopupEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


const showMoreComments = () => {
  let count = 0;
  while (comments.length !== 0 && count !== MORE_COMMENT_LOAD_VALUE){
    const comment = comments[0];
    const newComment = newCommentTemplate.cloneNode(true);

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentListElement.append(newComment);

    count++;
    comments.splice(0,1);
  }
  commentsCountValue = commentsCountValue + count;
  commentsCountElement.textContent = `${commentsCountValue} из `;
  commentsCountElement.append(allcommentsValueElement);
  commentsCountElement.append(' комментариев');

  if (comments.length){
    commentLoadButton.classList.remove('hidden');
  } else {
    commentLoadButton.classList.add('hidden');
  }
};

const createComments = (newPicture) => {
  comments = Array.from(newPicture.comments);
  allcommentsValueElement.textContent = comments.length;
  commentsCountValue = 0;

  //очщяем список комментариев чтобы заполнить его новыми. Источник: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  while (commentListElement.firstChild) {
    commentListElement.removeChild(commentListElement.firstChild);
  }
  showMoreComments();

  loadMoreCommentsButton.addEventListener('click',showMoreComments);

};

//метод для смены информации о фотографии
const openBigPicture = (newPicture) => {

  //добавим обработчики закрытия полноэкранной фотографии
  //при клике на кнопку
  closeButton.addEventListener('click',closeBigPicture, {once: true});
  //при нажатии Esc
  document.addEventListener('keydown',onPopupEscKeyDown, {once: true});


  bigPictureElement.querySelector('img').src = newPicture.url;
  bigPictureElement.querySelector('.likes-count').textContent = newPicture.likes;
  bigPictureElement.querySelector('.social__caption').textContent = newPicture.description;

  createComments(newPicture);


  bigPictureElement.classList.remove('hidden');
};

export {openBigPicture};
