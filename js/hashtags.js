'use strict';

(function () {
  var HASHTAG_MAX = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;

  var HashtagErrors = {
    MIN_LENGTH: 'Хэш-тег должен состоять минимум из двух символов',
    HASHTAG_START: 'Хэш-тег должен начинаться с #',
    MAX_LENGTH: 'Один хэш-тег должен содержать не более 20 символов',
    HASHTAG_SPACE: 'Хэш-теги разделяются пробелами',
    MAX_COUNT: 'Не более пяти хэш-тегов',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды'
  };

  var validateForm = function () {
    var userHashtags = hashtags.hashtag.value;

    if (userHashtags === '') {
      return undefined;
    }

    var hashtagsLowerCase = userHashtags.toLowerCase();
    var hashtagItems = hashtagsLowerCase.split(' ');

    if (hashtagItems.length > HASHTAG_MAX) {
      return HashtagErrors.MAX_COUNT;
    }

    for (var i = 0; i < hashtagItems.length; i++) {
      if (hashtagItems[i].length < HASHTAG_MIN_LENGTH) {
        return HashtagErrors.MIN_LENGTH;
      }
      if (hashtagItems[i][0] !== '#') {
        return HashtagErrors.HASHTAG_START;
      }
      if (hashtagItems[i].length > HASHTAG_MAX_LENGTH) {
        return HashtagErrors.MAX_LENGTH;
      }
      var hashtagLetters = hashtagItems[i].split('#');
      if (hashtagLetters.length > 2) {
        return HashtagErrors.HASHTAG_SPACE;
      }
      if (hashtagItems.indexOf(hashtagItems[i]) !== i) {
        return HashtagErrors.HASHTAG_REPEAT;
      }
    }
    return undefined;
  };

  var onSuccess = function () {
    window.effects.imgSetup.classList.add('hidden');
  };

  var onError = function () {
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

    if (errorMessage) {
      hashtags.hashtag.setCustomValidity(errorMessage);
      hashtags.hashtag.style.borderColor = 'red';
    } else {
      hashtags.hashtag.setCustomValidity('');
      hashtags.hashtag.style.borderColor = '';
    }
  });

  imgSetupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var errorMessage = validateForm();
    if (!errorMessage) {
      window.backend.upload(new FormData(imgSetupForm), onSuccess, onError);
    }
  });
})();
