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
  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_WIZARD_COUNT ? MAX_WIZARD_COUNT : data.length;
    wizardListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    wizardListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
