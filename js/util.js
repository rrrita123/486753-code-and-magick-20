'use strict';

window.util = (function () {
  return {
    // Получение случайного целого числа в заданном интервале, максимум и минимум включаются
    getRandomMinMax: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isEscEvent: function (evt, action, focus) {
      if (evt.key === 'Escape' && focus) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    }

  };

})();
