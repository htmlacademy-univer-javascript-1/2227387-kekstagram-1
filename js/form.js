import {isEscapeKey, getParamsForEffect} from './utils.js';
import {sendData} from './api.js';

//form
const uploadFormElement = document.querySelector('.img-upload__form');
//upload file
const inputFileElement = uploadFormElement.querySelector('#upload-file');

//pictur redactor
const editPictureFormElement = uploadFormElement.querySelector('.img-upload__overlay');
//buttons
const closeButton = editPictureFormElement.querySelector('#upload-cancel');
const smallerScaleButton = editPictureFormElement.querySelector('.scale__control--smaller');
const biggerScaleButton = editPictureFormElement.querySelector('.scale__control--bigger');
const effectsButtons = editPictureFormElement.querySelectorAll('.effects__radio');
const submitButton = editPictureFormElement.querySelector('.img-upload__submit');
//slider
const sliderElement = editPictureFormElement.querySelector('.img-upload__effect-level');
const slider = sliderElement.querySelector('.effect-level__slider');
const sliderValue = sliderElement.querySelector('.effect-level__value');

//fields
const scaleInputElement = editPictureFormElement.querySelector('.scale__control--value');
const imgPreviewElement = editPictureFormElement.querySelector('.img-upload__preview');
const descriptionElement = uploadFormElement.querySelector('.text__description');
const hashTagsElement = uploadFormElement.querySelector('.text__hashtags');
const successMessageElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);


const SIZE_CHANGE_VALUE = 25;
const MIN_SIZE_VALUE = 25;
const MAX_SIZE_VALUE = 100;
const MAX_HASTAGS_LENGTH = 20;
const MAX_HASTAGS_COUNT = 5;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let  effect, pristine, newMessage, messageButton;


//slider

const createNoUiSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  slider.noUiSlider.on('update', () => {
    const value =  slider.noUiSlider.get();
    sliderValue.value = value;

    const [, , , filterFuncName, sym] = getParamsForEffect(effect);
    imgPreviewElement.style.filter = `${filterFuncName}(${value + sym})`;

  });
};

const changeSliderOptions = () => {
  const [min, max, step, filterFuncName, sym] = getParamsForEffect(effect);

  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });

  imgPreviewElement.style.filter = `${filterFuncName}(${max + sym})`;
};


//validation

const isValidHashtag = (tag) => {
  const reg = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
  return reg.test(tag) && (tag.length <= MAX_HASTAGS_LENGTH);
};

const validateHashtags = (value) => {
  if(value === '') {return true;}

  const hashtagsArray = value.split(' ').map((newValue) => newValue.toLowerCase());
  if ((hashtagsArray.length > MAX_HASTAGS_COUNT) || (!hashtagsArray.every(isValidHashtag))) {return false;}
  const uniqueArray = Array.from(new Set(hashtagsArray));
  return uniqueArray.length === hashtagsArray.length;
};

const createPristineValidator = () => {
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  }, false);

  pristine.addValidator(
    hashTagsElement,
    validateHashtags,
    'Хэштеги должны быть уникальными, содержать не больше 20 сиволов, количесво хэштегов не должно превышать 5-ти'
  );
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

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


const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(newMessage);
  }
};

const onDocumentClick = (evt) => {
  if(evt.target !== newMessage.querySelector('div')) {
    closeMessage(newMessage);
  }
};

const showMessage = (isSuccess) =>{
  if (isSuccess) {
    newMessage = successMessageElement;
    messageButton = newMessage.querySelector('.success__button');
  } else {
    newMessage = errorMessageElement;
    messageButton = newMessage.querySelector('.error__button');
  }
  messageButton.addEventListener( 'click', closeMessage);
  document.removeEventListener( 'keydown', onPopupEscKeydown);
  document.addEventListener( 'keydown', onDocumentEscKeydown);
  document.addEventListener( 'click', onDocumentClick);

  document.body.append(newMessage);
};

const onFormSubmit = (evt) => {
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
        editPictureFormElement.classList.add('hidden');
        showMessage(false);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
};


const onSmallerButtonClick = () => {
  const value = parseInt(scaleInputElement.value, 10) - SIZE_CHANGE_VALUE;
  if (value < MIN_SIZE_VALUE) {
    scaleInputElement.value = `${MIN_SIZE_VALUE}%`;
    imgPreviewElement.style.transform = `scale(${MIN_SIZE_VALUE/100})`;
  } else {
    scaleInputElement.value = `${value}%`;
    imgPreviewElement.style.transform = `scale(${value/100})`;
  }
};

const onBiggerButtonClick = () => {
  const value = parseInt(scaleInputElement.value, 10) + SIZE_CHANGE_VALUE;
  if (value > MAX_SIZE_VALUE) {
    scaleInputElement.value = `${MAX_SIZE_VALUE}%`;
    imgPreviewElement.style.transform = `scale(${MAX_SIZE_VALUE/100})`;
  } else {
    scaleInputElement.value = `${value}%`;
    imgPreviewElement.style.transform = `scale(${value/100})`;
  }
};

const onEffectChange = (evt) => {
  imgPreviewElement.classList.remove(`effects__preview--${effect}`);
  effect = evt.target.value;
  imgPreviewElement.classList.add(`effects__preview--${effect}`);
  if (effect !== 'none') {
    sliderElement.classList.remove('hidden');
    changeSliderOptions();
  } else {
    sliderElement.classList.add('hidden');
    imgPreviewElement.style.filter = '';
  }

};

const updatePreview = () => {
  const file = inputFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreviewElement.querySelector('img').src = URL.createObjectURL(file);
  }
};

const addListeners = () => {
  //добавим обработчики закрытия загружаемого изображения
  //при клике на кнопку
  closeButton.addEventListener('click', closePictureRedactor, {once: true});
  //при нажатии Esc
  document.addEventListener( 'keydown', onPopupEscKeydown);

  //предотвращение закрытия если в фокусе поле для набора комментария и хэштега.
  descriptionElement.addEventListener( 'keydown', onPopupEscKeydownPrevent);
  hashTagsElement.addEventListener( 'keydown', onPopupEscKeydownPrevent);

  //обработчики редактора изображения
  smallerScaleButton.addEventListener('click', onSmallerButtonClick);
  biggerScaleButton.addEventListener('click', onBiggerButtonClick);
  for (const effectButton of effectsButtons){
    effectButton.addEventListener('change', onEffectChange);
  }

  //обработчик отправки формы
  uploadFormElement.addEventListener('submit', onFormSubmit);
};

const removeListeners = () => {
  document.removeEventListener( 'keydown', onPopupEscKeydown);

  descriptionElement.removeEventListener( 'keydown', onPopupEscKeydownPrevent);
  hashTagsElement.removeEventListener( 'keydown', onPopupEscKeydownPrevent);

  smallerScaleButton.removeEventListener('click', onSmallerButtonClick);
  biggerScaleButton.removeEventListener('click', onBiggerButtonClick);

  uploadFormElement.removeEventListener('submit', onFormSubmit);
};

const openPictureRedactor = () => {
  //default values
  scaleInputElement.value = `${MAX_SIZE_VALUE}%`;
  imgPreviewElement.style.transform = `scale(${MAX_SIZE_VALUE/100})`;
  effect = '';
  sliderElement.classList.add('hidden');

  updatePreview();

  editPictureFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  //add slider
  createNoUiSlider();
  //add validator
  createPristineValidator();
  //add all listeners
  addListeners();
};

//global func
const loadForm = () => {
  inputFileElement.addEventListener('change', openPictureRedactor);
};

function closeMessage(){
  document.body.removeChild(newMessage);
  document.removeEventListener( 'keydown', onDocumentEscKeydown);
  document.removeEventListener( 'click', onDocumentClick);
  document.addEventListener( 'keydown', onPopupEscKeydown);
  if (newMessage.classList.contains('error')) {
    editPictureFormElement.classList.remove('hidden');
  }
}

function closePictureRedactor(){
  inputFileElement.value = '';
  scaleInputElement.value = '100%';
  sliderValue.value = '';
  imgPreviewElement.style.filter = '';
  imgPreviewElement.classList.remove(`effects__preview--${effect}`);
  hashTagsElement.value = '';
  descriptionElement.value = '';

  removeListeners();
  slider.noUiSlider.destroy();

  editPictureFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

}

loadForm();
