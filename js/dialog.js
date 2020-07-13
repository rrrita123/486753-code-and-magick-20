'use strict';

(function () {
  // Открытие/закрытие окна настройки персонажа

  var setupOpen = document.querySelector('.setup-open');
  var userPopup = document.querySelector('.setup');
  var setupClose = document.querySelector('.setup-close');
  var inputName = document.querySelector('.setup-user-name');
  var isNotFocus = true;

  // Обработчик фокуса на input
  var onInputFocus = function () {
    isNotFocus = false;
  };

  var onInputNotFocus = function () {
    isNotFocus = true;
  };

  var openPopup = function () {
    userPopup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    inputName.addEventListener('focus', onInputFocus);
    inputName.addEventListener('blur', onInputNotFocus);
    window.wizard.colorAddEvent();
  };

  var closePopup = function () {
    userPopup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('focus', onInputFocus);
    document.removeEventListener('blur', onInputNotFocus);
    window.wizard.colorRemoveEvent();
    userPopup.style.removeProperty('top');
    userPopup.style.removeProperty('left');
  };

  // Обработчик окна на ESC
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup, isNotFocus);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Открывает диалоговое окно по Enter
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // Закрывает диалоговое окно по иконке Х Enter
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
