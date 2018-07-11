'use strict';

(function () {

  var onImgSetupEscPress = function (evt) {
    if (evt.keyCode === window.photos.KEYCODE_ESC && evt.target !== window.hashtags.hashtag && evt.target !== window.hashtags.commentText) {
      closeImgSetup();
    }
  };

  var openImgSetup = function () {
    effects.imgSetup.classList.remove('hidden');
    document.addEventListener('keydown', onImgSetupEscPress);
  };

  var closeImgSetup = function () {
    effects.imgSetup.classList.add('hidden');
    document.removeEventListener('keydown', onImgSetupEscPress);
    uploadFile.value = '';
  };

  var useEffect = function () {
    effectRadios.forEach(function (effectRadio) {
      if (effectRadio.checked) {
        effects.imgUpload.classList.add(EffectsType[effectRadio.id]);
      }
    });
  };

  var removeEffect = function (radios) {
    Array.from(radios).map(function (radio) {
      effects.imgUpload.classList.remove(EffectsType[radio.id]);
    });
  };

  var useScale = function (scaleNumber) {
    var EffectsScale = {
      'effect-none': '',
      'effect-chrome': 'grayscale(' + scaleNumber / 100 + ')',
      'effect-sepia': 'sepia(' + scaleNumber / 100 + ')',
      'effect-marvin': 'invert(' + scaleNumber + '%)',
      'effect-phobos': 'blur(' + scaleNumber * 0.03 + 'px)',
      'effect-heat': 'brightness(' + (1 + scaleNumber * 0.02) + ')'
    };

    effectRadios.forEach(function (effectRadio) {
      if (effectRadio.checked) {
        effects.imgUpload.style.filter = EffectsScale[effectRadio.id];
      }
    });
  };

  var getDefaultScale = function () {
    scalePin.style.left = (scaleLine.offsetLeft + scaleLine.offsetWidth - scalePin.offsetWidth + 'px');
    scaleLevel.style.width = (scaleLine.offsetWidth + 'px');
    var effectValue = effects.MAX_VALUE;
    useScale(effectValue);
  };

  var hideScale = function () {
    imgScale.classList.add('hidden');
  };
  var showScale = function () {
    imgScale.classList.remove('hidden');
  };

  var movePin = function (currentPinX, shiftX) {

    var minX = scaleLine.offsetLeft - scalePin.offsetWidth / 2;
    var maxX = scaleLine.offsetLeft + scaleLine.offsetWidth - scalePin.offsetWidth / 2;

    if (currentPinX >= minX && currentPinX <= maxX) {
      scalePin.style.left = (currentPinX - scalePin.offsetWidth / 2 + 'px');
      scaleLevel.style.width = (scaleLevel.offsetWidth + shiftX + 'px');
    }

    var effectValue = Math.floor((scaleLevel.offsetWidth / scaleLine.offsetWidth) * 100);
    useScale(effectValue);

    scaleValue.value = effectValue;
  };

  var effects = {
    MAX_VALUE: 100,
    imgUpload: document.querySelector('.img-upload__preview'),
    imgSetup: document.querySelector('.img-upload__overlay'),
  };

  window.effects = effects;

  var imgSetupCancel = effects.imgSetup.querySelector('#upload-cancel');
  var effectSetup = effects.imgSetup.querySelector('.img-upload__effects');
  var effectRadios = effects.imgSetup.querySelectorAll('.effects__radio');
  var EffectsType = {
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  var imgScale = effects.imgSetup.querySelector('.img-upload__scale');
  var scalePin = imgScale.querySelector('.scale__pin');
  var scaleLine = imgScale.querySelector('.scale__line');
  var scaleLevel = imgScale.querySelector('.scale__level');
  var scaleValue = imgScale.querySelector('.scale__value');

  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function () {
    var previewPhoto = effects.imgSetup.querySelector('img');
    var previewEffects = effects.imgSetup.querySelectorAll('.effects__preview');
    var file = uploadFile.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var dataURL = reader.result;
      previewPhoto.src = dataURL;
      previewEffects.forEach(function (previewEffect) {
        previewEffect.style.backgroundImage = 'url(' + dataURL + ')';
      });
    });

    reader.readAsDataURL(file);

    openImgSetup();
    useEffect();
    getDefaultScale();
    window.sizePhoto();
  });

  imgSetupCancel.addEventListener('click', function () {
    closeImgSetup();
    removeEffect(effectRadios);
  });

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

      var currentX = scalePin.offsetLeft + scalePin.offsetWidth / 2 + shift.x;

      movePin(currentX, shift.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!isDragged) {
        startCoords = {
          x: scalePin.offsetLeft + scalePin.offsetWidth / 2,
          y: evt.clientY
        };

        var shift = {
          x: evt.offsetX - startCoords.x,
          y: evt.clientY
        };

        var currentX = evt.offsetX;

        movePin(currentX, shift.x);
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
    removeEffect(effectRadios);
    effects.imgUpload.classList.add(EffectsType[evt.target.id]);

    if (evt.target.id === 'effect-none') {
      hideScale();
    }
  });
})();
