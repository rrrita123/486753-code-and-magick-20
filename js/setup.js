'use strict';

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Получение случайного целого числа в заданном интервале, максимум и минимум включаются
var getRandomMinMax = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива персонажей
var createWizardArr = function () {
  var quantity = 4;
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    wizards[i] = {
      name: WIZARD_NAME[getRandomMinMax(0, WIZARD_NAME.length - 1)] + ' ' + WIZARD_SURNAME[getRandomMinMax(0, WIZARD_SURNAME.length - 1)],
      coatColor: COAT_COLOR[getRandomMinMax(0, COAT_COLOR.length - 1)],
      eyesColor: EYES_COLOR[getRandomMinMax(0, EYES_COLOR.length - 1)]
    };
  }

  return wizards;
};

var wizardListElement = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var arrWizard = createWizardArr();

// Создание DOM - элементов из шаблона
var renderWizard = function (wizard) {
  var cloneWizardElement = wizardTemplate.cloneNode(true);

  cloneWizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  cloneWizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  cloneWizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return cloneWizardElement;
};

// Накопление и Отрисовка DOM-элементов из Fragment
var writeElement = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrWizard.length; i++) {
    fragment.appendChild(renderWizard(arrWizard[i]));
  }

  wizardListElement.appendChild(fragment);
};

writeElement();

document.querySelector('.setup-similar').classList.remove('hidden');

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

var wizardCoat = userPopup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = userPopup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = userPopup.querySelector('.setup-fireball-wrap');

// Обработчик выбора цвета мантии
var onCoatChangeColor = function () {
  var randomColorCoat = COAT_COLOR[getRandomMinMax(0, COAT_COLOR.length - 1)];
  wizardCoat.style.fill = randomColorCoat;
  userPopup.querySelector('input[name=coat-color]').value = randomColorCoat;
};

// Обработчик выбора цвета глаз
var onEyesChangeColor = function () {
  var randomColorEyes = EYES_COLOR[getRandomMinMax(0, EYES_COLOR.length - 1)];
  wizardEyes.style.fill = randomColorEyes;
  userPopup.querySelector('input[name=eyes-color]').value = randomColorEyes;
};

// Обработчик выбора цвет фаербола
var onFireballChangeColor = function () {
  var randomColorFireball = FIREBALL_COLOR[getRandomMinMax(0, FIREBALL_COLOR.length - 1)];
  wizardFireball.style.background = randomColorFireball;
  userPopup.querySelector('input[name=fireball-color]').value = randomColorFireball;
};

// Обработчик окна на ESC
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && isNotFocus) {
    evt.preventDefault();
    userPopup.classList.add('hidden');
  }
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
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});
