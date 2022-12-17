import {showAlert} from './utils.js';

const getData = (onSuccess, callBack) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert(`Не удалось загрузить данные, код ошибки:${response.status}`);
    })
    .then((data) => {
      if (data) {
        onSuccess(data, callBack);
      } else {
        showAlert('Данные не были получены');
      }

    })
    .catch((err) => {
      showAlert(`${err.message}: Не удалось загрузить данные`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
