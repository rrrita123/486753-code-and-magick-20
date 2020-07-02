'use strict';

(function () {
  // Открытие/закрытие окна настройки персонажа
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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

  var wizardCoat = userPopup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = userPopup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userPopup.querySelector('.setup-fireball-wrap');

  // Обработчик выбора цвета мантии
  var onCoatChangeColor = function () {
    var colorCoat = window.colorize.changeColor(wizardCoat, COAT_COLOR);
    userPopup.querySelector('input[name=coat-color]').value = colorCoat;
  };

  // Обработчик выбора цвета глаз
  var onEyesChangeColor = function () {
    var colorEyes = window.colorize.changeColor(wizardEyes, EYES_COLOR);
    userPopup.querySelector('input[name=eyes-color]').value = colorEyes;
  };

  // Обработчик выбора цвета фаербола
  var onFireballChangeColor = function () {
    var colorFireball = window.colorize.changeColor(wizardFireball, FIREBALL_COLOR);
    userPopup.querySelector('input[name=fireball-color]').value = colorFireball;
  };

  var openPopup = function () {
    userPopup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    inputName.addEventListener('focus', onInputFocus);
    inputName.addEventListener('blur', onInputNotFocus);
    wizardCoat.addEventListener('click', onCoatChangeColor);
    wizardEyes.addEventListener('click', onEyesChangeColor);
    wizardFireball.addEventListener('click', onFireballChangeColor);
  };

  var closePopup = function () {
    userPopup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('focus', onInputFocus);
    document.removeEventListener('blur', onInputNotFocus);
    wizardCoat.removeEventListener('click', onCoatChangeColor);
    wizardEyes.removeEventListener('click', onEyesChangeColor);
    wizardFireball.removeEventListener('click', onFireballChangeColor);

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
