'use strict';

(function () {

  var STEP = 25;
  var MIN_VALUE = 25;

  var resize = function (valueResizeNumber) {

    if (MIN_VALUE <= valueResizeNumber && valueResizeNumber <= window.effects.MAX_VALUE) {
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
    resize(parseInt(valueResize.value, 10) - STEP);
  });

  plusResize.addEventListener('click', function () {
    resize(parseInt(valueResize.value, 10) + STEP);
  });
})();
