'use strict';
// Модуль для раскраски элементов мага
(function () {
  window.colorize = {
    changeColor: function (element, color) {
      var randomColor = color[window.util.getRandomMinMax(0, color.length - 1)];
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = randomColor;
      } else {
        element.style.fill = randomColor;
      }
      return randomColor;
    },
  };
})();
