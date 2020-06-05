'use strict';

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userPopup = document.querySelector('.setup');
userPopup.classList.remove('hidden');

// Получение случайного целого числа в заданном интервале, максимум и минимум включаются
var getRandom = function (min, max) {
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
      name: WIZARD_NAME[getRandom(0, WIZARD_NAME.length - 1)] + ' ' + WIZARD_SURNAME[getRandom(0, WIZARD_SURNAME.length - 1)],
      coatColor: COAT_COLOR[getRandom(0, COAT_COLOR.length - 1)],
      eyesColor: EYES_COLOR[getRandom(0, EYES_COLOR.length - 1)]
    };
  }

  return wizards;
};

var wizardListElement = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
