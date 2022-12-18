import {isEscapeKey, getParamsForEffect} from './utils.js';
import {sendData} from './api.js';

//form
const uploadForm = document.querySelector('.img-upload__form');
//upload file
const inputFile = uploadForm.querySelector('#upload-file');

//pictur redactor
const editPictureForm = uploadForm.querySelector('.img-upload__overlay');
//buttons
const closeButton = editPictureForm.querySelector('#upload-cancel');
const smallerScaleButton = editPictureForm.querySelector('.scale__control--smaller');
const biggerScaleButton = editPictureForm.querySelector('.scale__control--bigger');
const effectsButtons = editPictureForm.querySelectorAll('.effects__radio');
const submitButton = editPictureForm.querySelector('.img-upload__submit');
//slider
const sliderField = editPictureForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderField.querySelector('.effect-level__slider');
const sliderValue = sliderField.querySelector('.effect-level__value');

//fields
const scaleInput = editPictureForm.querySelector('.scale__control--value');
const imgPreview = editPictureForm.querySelector('.img-upload__preview');
const description = uploadForm.querySelector('.text__description');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let  effect, pristine, newMessage, messageButton;

function blockSubmitButton(){
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
}
function unblockSubmitButton(){
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function onPopupEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureRedactor();
  }
}

function onPopupEscKeydownPrevent(evt){
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function closeMessage(){
  document.body.removeChild(newMessage);
  document.removeEventListener( 'keydown', closeMsgEscKeydown);
  document.removeEventListener( 'click', closeMsgWindowClick);
  document.addEventListener( 'keydown', onPopupEscKeydown);
  if (newMessage.classList.contains('error')) {
    editPictureForm.classList.remove('hidden');
  }
}

function closeMsgEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(newMessage);
  }
}

function closeMsgWindowClick(evt){
  if(evt.target !== newMessage.querySelector('div')) {
    closeMessage(newMessage);
  }
}

function showMessage(isSuccess){
  if (isSuccess) {
    newMessage = successMessage;
    messageButton = newMessage.querySelector('.success__button');
  } else {
    newMessage = errorMessage;
    messageButton = newMessage.querySelector('.error__button');
  }
  messageButton.addEventListener( 'click', closeMessage);
  document.removeEventListener( 'keydown', onPopupEscKeydown);
  document.addEventListener( 'keydown', closeMsgEscKeydown);
  document.addEventListener( 'click', closeMsgWindowClick);

  document.body.append(newMessage);
}

function onFormSubmit(evt){
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        closePictureRedactor();
        showMessage(true);
        unblockSubmitButton();
      },
      () => {
        editPictureForm.classList.add('hidden');
        showMessage(false);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
}

function onSmallerButtonClick(){
  const value = parseInt(scaleInput.value, 10) - 25;
  if (value < 25) {
    scaleInput.value = '25%';
    imgPreview.style.transform = 'scale(0.25)';
  } else {
    scaleInput.value = `${value}%`;
    imgPreview.style.transform = `scale(${value/100})`;
  }
}

function onBiggerButtonClick(){
  const value = parseInt(scaleInput.value, 10) + 25;
  if (value > 100) {
    scaleInput.value = '100%';
    imgPreview.style.transform = 'scale(1)';
  } else {
    scaleInput.value = `${value}%`;
    imgPreview.style.transform = `scale(${value/100})`;
  }
}

function onEffectChange(evt){
  imgPreview.classList.remove(`effects__preview--${effect}`);
  effect = evt.target.value;
  imgPreview.classList.add(`effects__preview--${effect}`);
  if (effect !== 'none') {
    sliderField.classList.remove('hidden');
    changeSliderOptions();
  } else {
    sliderField.classList.add('hidden');
    imgPreview.style.filter = '';
  }

}

function updatePreview(){
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.querySelector('img').src = URL.createObjectURL(file);
  }
}

function addListeners(){
  //добавим обработчики закрытия загружаемого изображения
  //при клике на кнопку
  closeButton.addEventListener('click', closePictureRedactor, {once: true});
  //при нажатии Esc
  document.addEventListener( 'keydown', onPopupEscKeydown);

  //предотвращение закрытия если в фокусе поле для набора комментария
  description.addEventListener( 'keydown', onPopupEscKeydownPrevent);

  //обработчики редактора изображения
  smallerScaleButton.addEventListener('click', onSmallerButtonClick);
  biggerScaleButton.addEventListener('click', onBiggerButtonClick);
  for (const effectButton of effectsButtons){
    effectButton.addEventListener('change', onEffectChange);
  }

  //обработчик отправки формы
  uploadForm.addEventListener('submit', onFormSubmit);
}

function removeListeners(){
  document.removeEventListener( 'keydown', onPopupEscKeydown);

  description.removeEventListener( 'keydown', onPopupEscKeydownPrevent);

  smallerScaleButton.removeEventListener('click', onSmallerButtonClick);
  biggerScaleButton.removeEventListener('click', onBiggerButtonClick);

  uploadForm.removeEventListener('submit', onFormSubmit);


}

function openPictureRedactor(){

  updatePreview();

  editPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  //default values
  scaleInput.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  effect = '';
  sliderField.classList.add('hidden');

  //add slider
  createNoUiSlider();
  //add validator
  createPristineValidator();

  //add all listeners
  addListeners();
}

function closePictureRedactor(){
  inputFile.value = '';
  scaleInput.value = '100%';
  sliderValue.value = '';
  imgPreview.style.filter = '';
  imgPreview.classList.remove(`effects__preview--${effect}`);
  uploadForm.querySelector('.text__hashtags').value = '';
  description.value = '';

  removeListeners();
  sliderElement.noUiSlider.destroy();

  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

}

//slider

function createNoUiSlider(){
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const value =  sliderElement.noUiSlider.get();
    sliderValue.value = value;

    const [, , , filterFuncName, sym] = getParamsForEffect(effect);
    imgPreview.style.filter = `${filterFuncName}(${value + sym})`;

  });
}

function changeSliderOptions(){
  const [min, max, step, filterFuncName, sym] = getParamsForEffect(effect);

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });

  imgPreview.style.filter = `${filterFuncName}(${max + sym})`;
}

//validation

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

function createPristineValidator() {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  }, false);

  pristine.addValidator(
    uploadForm.querySelector('.text__hashtags'),
    validateHashtags,
    'хэштеги должны быть уникальны, Хэштегов должно быть не больше 5, Хэштеги могут сордержать только буквы и цифры'
  );
}

//global func
function loadForm(){
  inputFile.addEventListener('change', openPictureRedactor);
}

loadForm();
