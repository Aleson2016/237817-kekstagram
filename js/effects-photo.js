'use strict';

(function () {
  var KEYCODE_ESC = 27;
  var MAX_VALUE = 100;
  var uploadFile = document.querySelector('#upload-file');
  var imgSetup = document.querySelector('.img-upload__overlay');
  var imgSetupCancel = imgSetup.querySelector('#upload-cancel');
  window.effectsPhoto = document.querySelector('.img-upload__preview');

  var onImgSetupEscPress = function (evt) {
    if (evt.keyCode === KEYCODE_ESC && evt.target !== window.hashtags.hashtag && evt.target !== window.hashtags.commentText) {
      closeImgSetup();
    }
  };

  var openImgSetup = function () {
    imgSetup.classList.remove('hidden');
    document.addEventListener('keydown', onImgSetupEscPress);
  };

  var closeImgSetup = function () {
    imgSetup.classList.add('hidden');
    document.removeEventListener('keydown', onImgSetupEscPress);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openImgSetup();
    for (var i = 0; i < effectRadio.length; i++) {
      if (effectRadio[i].checked) {
        window.effectsPhoto.classList.add(effects[effectRadio[i].id]);
      }
    }
    getDefaultScale();
    window.sizePhoto();
  });

  imgSetupCancel.addEventListener('click', function () {
    closeImgSetup();
    for (var i = 0; i < effectRadio.length; i++) {
      if (effectRadio[i].checked) {
        window.effectsPhoto.classList.remove(effects[effectRadio[i].id]);
      }
    }
  });

  // Эффекты
  var effectSetup = imgSetup.querySelector('.img-upload__effects');
  var effectRadio = imgSetup.querySelectorAll('.effects__radio');
  var effects = {
    // "effect-none": '',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  var imgScale = imgSetup.querySelector('.img-upload__scale');
  var scalePin = imgScale.querySelector('.scale__pin');
  var scaleLine = imgScale.querySelector('.scale__line');
  var scaleLevel = imgScale.querySelector('.scale__level');
  var scaleValue = imgScale.querySelector('.scale__value');

  var useScale = function (scaleNumber) {
    var effectsScale = {
      'effect-none': '',
      'effect-chrome': 'grayscale(' + scaleNumber / 100 + ')',
      'effect-sepia': 'sepia(' + scaleNumber / 100 + ')',
      'effect-marvin': 'invert(' + scaleNumber + '%)',
      'effect-phobos': 'blur(' + scaleNumber * 0.03 + 'px)',
      'effect-heat': 'brightness(' + scaleNumber * 0.03 + ')'
    };

    for (var i = 0; i < effectRadio.length; i++) {
      if (effectRadio[i].checked) {
        window.effectsPhoto.style.filter = effectsScale[effectRadio[i].id];
      }
    }
  };

  var getDefaultScale = function () {
    scalePin.style.left = (scaleLine.offsetLeft + scaleLine.offsetWidth - scalePin.offsetWidth + 'px');
    scaleLevel.style.width = (scaleLine.offsetWidth + 'px');
    var effectValue = MAX_VALUE;
    useScale(effectValue);
  };

  var hideScale = function () {
    imgScale.classList.add('hidden');
  };
  var showScale = function () {
    imgScale.classList.remove('hidden');
  };

  // слайдер
  imgScale.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: evt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: evt.clientY
      };

      var minX = scaleLine.offsetLeft - scalePin.offsetWidth / 2;
      var maxX = scaleLine.offsetLeft + scaleLine.offsetWidth - scalePin.offsetWidth / 2;
      var currentX = scalePin.offsetLeft + scalePin.offsetWidth / 2 + shift.x;

      if (currentX >= minX && currentX <= maxX) {
        scalePin.style.left = (currentX - scalePin.offsetWidth / 2 + 'px');
        scaleLevel.style.width = (scaleLevel.offsetWidth + shift.x + 'px');
      }

      var effectValue = Math.floor((scaleLevel.offsetWidth / scaleLine.offsetWidth) * 100);

      useScale(effectValue);

      scaleValue.value = '' + effectValue;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (isDragged === false) {
        startCoords = {
          x: scalePin.offsetLeft + scalePin.offsetWidth / 2,
          y: evt.clientY
        };

        var shift = {
          x: startCoords.x - evt.offsetX,
          y: evt.clientY
        };

        var minX = scaleLine.offsetLeft - scalePin.offsetWidth / 2;
        var maxX = scaleLine.offsetLeft + scaleLine.offsetWidth - scalePin.offsetWidth / 2;
        var currentX = evt.offsetX - scalePin.offsetWidth / 2;

        if (currentX >= minX && currentX <= maxX) {
          scalePin.style.left = currentX + 'px';
          scaleLevel.style.width = (scaleLevel.offsetWidth - shift.x + 'px');
        }

        var effectValue = Math.floor((scaleLevel.offsetWidth / scaleLine.offsetWidth) * 100);

        useScale(effectValue);

        scaleValue.value = '' + effectValue;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectSetup.addEventListener('change', function (evt) {
    showScale();
    getDefaultScale();

    window.effectsPhoto.classList.add(effects[evt.target.id]);

    if (evt.target.id === 'effect-none') {
      hideScale();
    }

    for (var i = 0; i < effectRadio.length; i++) {
      if (effectRadio[i] !== evt.target) {
        window.effectsPhoto.classList.remove(effects[effectRadio[i].id]);
      }
    }
  });
})();
