'use strict';

window.wizard = (function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userPopup = document.querySelector('.setup');
  var wizardCoat = userPopup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = userPopup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userPopup.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  // Обработчик выбора цвета мантии
  var onCoatChangeColor = function () {
    var colorCoat = window.colorize.changeColor(wizardCoat, COAT_COLOR);
    userPopup.querySelector('input[name=coat-color]').value = colorCoat;
    var coatColor = colorCoat;
    wizard.onCoatChange(coatColor);
  };

  // Обработчик выбора цвета глаз
  var onEyesChangeColor = function () {
    var colorEyes = window.colorize.changeColor(wizardEyes, EYES_COLOR);
    userPopup.querySelector('input[name=eyes-color]').value = colorEyes;
    var eyesColor = colorEyes;
    wizard.onEyesChange(eyesColor);
    // window.setup.updateWizards();
  };

  // Обработчик выбора цвета фаербола
  var onFireballChangeColor = function () {
    var colorFireball = window.colorize.changeColor(wizardFireball, FIREBALL_COLOR);
    userPopup.querySelector('input[name=fireball-color]').value = colorFireball;
  };

  // Функция добавляет отбаротчики событий
  var colorAddEvent = function () {
    wizardCoat.addEventListener('click', onCoatChangeColor);
    wizardEyes.addEventListener('click', onEyesChangeColor);
    wizardFireball.addEventListener('click', onFireballChangeColor);
  };

  // Функция удаляет отбаротчики событий
  var colorRemoveEvent = function () {
    wizardCoat.removeEventListener('click', onCoatChangeColor);
    wizardEyes.removeEventListener('click', onEyesChangeColor);
    wizardFireball.removeEventListener('click', onFireballChangeColor);
  };

  return {
    colorAddEvent: colorAddEvent,
    colorRemoveEvent: colorRemoveEvent,
    wizard: wizard,
  };
})();
