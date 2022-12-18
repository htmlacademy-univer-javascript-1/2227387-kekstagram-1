import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const newCommentTemplate = commentList.querySelector('.social__comment');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadMoreCommentsButton = bigPicture.querySelector('.social__comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const allcommentsValue = bigPicture.querySelector('.comments-count');
const commentLoadButton = bigPicture.querySelector('.comments-loader');

let comments;
let commentsCountValue;


function closeBigPicture(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function onPopupEscKeyDown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function showFiveComments(){
  let count = 0;
  while (comments.length !== 0 && count !== 5){
    const comment = comments[0];
    const newComment = newCommentTemplate.cloneNode(true);

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentList.append(newComment);

    count++;
    comments.splice(0,1);
  }
  commentsCountValue = commentsCountValue + count;
  commentsCount.textContent = `${commentsCountValue} из `;
  commentsCount.append(allcommentsValue);
  commentsCount.append(' комментариев');

  if (comments.length){
    commentLoadButton.classList.remove('hidden');
  } else {
    commentLoadButton.classList.add('hidden');
  }
}

function createComments(newPicture){
  comments = Array.from(newPicture.comments);
  allcommentsValue.textContent = comments.length;
  commentsCountValue = 0;

  //очщяем список комментариев чтобы заполнить его новыми. Источник: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }
  showFiveComments();

  loadMoreCommentsButton.addEventListener('click',showFiveComments);

}

//метод для смены информации о фотографии
function openBigPicture(newPicture){

  //добавим обработчики закрытия полноэкранной фотографии
  //при клике на кнопку
  closeButton.addEventListener('click',closeBigPicture, {once: true});
  //при нажатии Esc
  document.addEventListener('keydown',onPopupEscKeyDown, {once: true});


  bigPicture.querySelector('img').src = newPicture.url;
  bigPicture.querySelector('.likes-count').textContent = newPicture.likes;
  bigPicture.querySelector('.social__caption').textContent = newPicture.description;

  createComments(newPicture);


  bigPicture.classList.remove('hidden');
}

export {openBigPicture};
