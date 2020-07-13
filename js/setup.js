'use strict';

window.setup = (function () {


  var wizards = [];

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  // Устанавливаем Ранг отличия
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сортируем двух магом, ищем у кого весомее ранг
  // Если одинаковые ранги сортируем дополнительно по алфавиту
  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  // Функция обработчик успешной загрузки
  var onSuccess = function (data) {
    wizards = data;
    updateWizards();
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

  return {
    updateWizards: updateWizards
  };

})();
