import {isEscapeKey} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const editPictureForm = uploadForm.querySelector('.img-upload__overlay');
const inputFile = uploadForm.querySelector('#upload-file');
const description = uploadForm.querySelector('.text__description');
const closeButton = editPictureForm.querySelector('#upload-cancel');

let pristine;

loadForm();

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureRedactor();
  }
};

const onPopupEscKeydownPrevent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

function addListeners(){
  //добавим обработчики закрытия загружаемого изображения
  //при клике на кнопку
  closeButton.addEventListener('click', closePictureRedactor, {once: true});
  //при нажатии Esc
  document.addEventListener( 'keydown', onPopupEscKeydown);
  //предотвращение закрытия если в фокусе поле для набора комментария
  description.addEventListener( 'keydown', onPopupEscKeydownPrevent);


  uploadForm.addEventListener('submit', onFormSubmit);
}

function removeListeners(){
  document.removeEventListener( 'keydown', onPopupEscKeydown);

  description.removeEventListener( 'keydown', onPopupEscKeydownPrevent);

  uploadForm.removeEventListener('submit', onFormSubmit);
}


function openPictureRedactor(){
  editPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  //добавим валидатор
  createpPristineValidator();

  //добавим все нужные обработчики
  addListeners();

}

function closePictureRedactor(){
  inputFile.value = '';
  uploadForm.querySelector('.scale__control--value').value = '100%';
  uploadForm.querySelector('.effect-level__value').value = 'none';
  uploadForm.querySelector('.text__hashtags').value = '';
  description.value = '';

  removeListeners();

  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

}

//valifation

function isValidHashtag(tag){
  const reg = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
  return reg.test(tag);
}

function validateHashtags(value){
  if(value === '') {return true;}

  const hashtagsArray = value.split(' ').map((newValue) => newValue.toLowerCase());
  if ((hashtagsArray.length > 5) || (!hashtagsArray.every(isValidHashtag))) {return false;}
  const uniqueArray = Array.from(new Set(hashtagsArray));
  return uniqueArray.length === hashtagsArray.length;
}

function createpPristineValidator() {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  }, false);

  pristine.addValidator(
    uploadForm.querySelector('.text__hashtags'),
    validateHashtags,
    'Неправильно введены хэштеги'
  );
}

//global func
function loadForm(){
  inputFile.addEventListener('change', openPictureRedactor);
}

