'use strict';

(function () {
  var HASHTAG_MAX = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;

  var HASHTAG_ERRORS = {
    MIN_LENGTH: 'Хэш-тег должен состоять минимум из двух символов',
    HASHTAG_START: 'Хэш-тег должен начинаться с #',
    MAX_LENGTH: 'Один хэш-тег должен содержать не более 20 символов',
    HASHTAG_SPACE: 'Хэш-теги разделяются пробелами',
    MAX_COUNT: 'Не более пяти хэш-тегов',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды'
  };

  var validateForm = function () {
    var userHashtags = hashtags.hashtag.value;
    var hashtagsLowerCase = userHashtags.toLowerCase();
    var hashtagItems = hashtagsLowerCase.split(' ');

    if (hashtagItems.length > HASHTAG_MAX) {
      return HASHTAG_ERRORS.MAX_COUNT;
    }

    for (var i = 0; i < hashtagItems.length; i++) {
      if (hashtagItems[i].length < HASHTAG_MIN_LENGTH) {
        return HASHTAG_ERRORS.MIN_LENGTH;
      }
      if (hashtagItems[i][0] !== '#') {
        return HASHTAG_ERRORS.HASHTAG_START;
      }
      if (hashtagItems[i].length > HASHTAG_MAX_LENGTH) {
        return HASHTAG_ERRORS.MAX_LENGTH;
      }
      var hashtagLetters = hashtagItems[i].split('#');
      if (hashtagLetters.length > 2) {
        return HASHTAG_ERRORS.HASHTAG_SPACE;
      }
      if (hashtagItems.indexOf(hashtagItems[i]) !== i) {
        return HASHTAG_ERRORS.HASHTAG_REPEAT;
      }
    }
    return true;
  };

  var successHandler = function () {
    window.effects.imgSetup.classList.add('hidden');
  };

  var errorHandler = function () {
    window.effects.imgSetup.classList.add('hidden');
    var messageError = errorTemplate.cloneNode(true);
    imgSetupForm.appendChild(messageError);
    messageError.classList.remove('hidden');
  };

  var hashtags = {
    hashtag: document.querySelector('.text__hashtags'),
    commentText: document.querySelector('.text__description')
  };

  window.hashtags = hashtags;

  var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');

  var imgSetupForm = document.querySelector('.img-upload__form');

  hashtags.hashtag.addEventListener('input', function () {
    var errorMessage = validateForm();

    if (errorMessage !== true) {
      hashtags.hashtag.setCustomValidity(errorMessage);
      hashtags.hashtag.style.borderColor = 'red';
    } else {
      hashtags.hashtag.setCustomValidity('');
      hashtags.hashtag.style.borderColor = '';
    }
  });

  imgSetupForm.addEventListener('submit', function (evt) {
    var validated = validateForm();
    if (validated !== true) {
      evt.preventDefault();
    }
    window.backend.upload(new FormData(imgSetupForm), successHandler, errorHandler);
    evt.preventDefault();

  });
})();
