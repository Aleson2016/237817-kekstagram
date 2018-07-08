'use strict';

(function () {

  var STEP = 25;
  var MIN_VALUE = 25;

  var resizeMinus = function () {
    var valueResizeNumber = parseInt(valueResize.value, 10);
    if (valueResizeNumber >= MIN_VALUE + STEP) {
      valueResizeNumber = valueResizeNumber - STEP;
      valueResize.value = valueResizeNumber + '%';
      var scaleValue = valueResizeNumber / 100;
      window.effects.imgUpload.style.transform = 'scale(' + scaleValue + ')';
    }
  };
  var resizePlus = function () {
    var valueResizeNumber = parseInt(valueResize.value, 10);
    if (valueResizeNumber <= window.effects.MAX_VALUE - STEP) {
      valueResizeNumber = valueResizeNumber + STEP;
      valueResize.value = valueResizeNumber + '%';
      var scaleValue = valueResizeNumber / 100;
      window.effects.imgUpload.style.transform = 'scale(' + scaleValue + ')';
    }
  };

  window.sizePhoto = function () {
    valueResize.value = window.effects.MAX_VALUE + '%';
    var valueResizeNumber = parseInt(valueResize.value, 10);
    var scaleValue = valueResizeNumber / 100;
    window.effects.imgUpload.style.transform = 'scale(' + scaleValue + ')';
  };

  var minusResize = document.querySelector('.resize__control--minus');
  var plusResize = document.querySelector('.resize__control--plus');
  var valueResize = document.querySelector('.resize__control--value');

  minusResize.addEventListener('click', function () {
    resizeMinus();

  });

  plusResize.addEventListener('click', function () {
    resizePlus();
  });
})();
