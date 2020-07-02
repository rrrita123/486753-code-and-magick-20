'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandle = setupDialogElement.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {

      // Изначальные коордитаты точки нажатия
      var startCoord = {
        x: evt.clientX,
        y: evt.clientY
      };

      // Переменная хранит состояние, что по умолчанию окно не перетаскивается
      var dragged = false;

      // При каждом движении мыши обновляем смещение относительно первоначальной точки
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoord.x - moveEvt.clientX,
          y: startCoord.y - moveEvt.clientY
        };

        startCoord = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
        setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
      };

      // При отпускании кнопки мыши перестаем слушать события движения мыши
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseop', onMouseUp);

        if (dragged) {
          var onClickPreventDefauld = function (clickEvt) {
            clickEvt.preventDefault();
            dialogHandle.removeEventListener('click', onClickPreventDefauld);
          };
          dialogHandle.addEventListener('click', onClickPreventDefauld);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
