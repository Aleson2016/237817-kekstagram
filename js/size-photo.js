'use strict';

(function () {
  // масштаб
  var STEP = 25;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var minusResize = document.querySelector('.resize__control--minus');
  var plusResize = document.querySelector('.resize__control--plus');
  var valueResize = document.querySelector('.resize__control--value');

  window.sizePhoto = function () {
    valueResize.value = MAX_VALUE + '%';
    var valueResizeNumber = parseInt(valueResize.value, 10);
    var scaleValue = valueResizeNumber / 100;
    window.effectsPhoto.style.transform = 'scale(' + scaleValue + ')';
  };

  var resizeMinus = function () {
    var valueResizeNumber = parseInt(valueResize.value, 10);
    if (valueResizeNumber >= MIN_VALUE + STEP) {
      valueResizeNumber = valueResizeNumber - STEP;
      valueResize.value = valueResizeNumber + '%';
      var scaleValue = valueResizeNumber / 100;
      window.effectsPhoto.style.transform = 'scale(' + scaleValue + ')';
    }
  };
  var resizePlus = function () {
    var valueResizeNumber = parseInt(valueResize.value, 10);
    if (valueResizeNumber <= MAX_VALUE - STEP) {
      valueResizeNumber = valueResizeNumber + STEP;
      valueResize.value = valueResizeNumber + '%';
      var scaleValue = valueResizeNumber / 100;
      window.effectsPhoto.style.transform = 'scale(' + scaleValue + ')';
    }
  };

  minusResize.addEventListener('click', function () {
    resizeMinus();

  });

  plusResize.addEventListener('click', function () {
    resizePlus();
  });
})();
