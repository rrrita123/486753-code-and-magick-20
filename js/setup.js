'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;

  var wizardListElement = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Создание DOM - элементов из шаблона
  var renderWizard = function (wizard) {
    var cloneWizardElement = wizardTemplate.cloneNode(true);

    cloneWizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    cloneWizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    cloneWizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return cloneWizardElement;
  };

  // Накопление и Отрисовка DOM-элементов из Fragment, данные о магах подгружаем с сервера
  // Функция обработчик успешной загрузки
  var onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    wizardListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Функция обработчик ошибки
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Данные о магах подгружаем с сервера backend.load
  window.backend.load(onSuccess, onError);

  // При отправке формы воспользуемся функцией backend.save и отменим действие формы по умолчанию
  // Диалог закроется, как только данные будут успешно сохранены.
  var userDialogElement = document.querySelector('.setup');
  var form = userDialogElement.querySelector('.setup-wizard-form');

  var onSubmit = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialogElement.classList.add('hidden');
    }, onError);
    evt.preventDefault();
  };

  form.addEventListener('submit', onSubmit);

})();
