'use strict';

(function () {
  window.hashtags = {
    hashtag: document.querySelector('.text__hashtags'),
    commentText: document.querySelector('.text__description')
  };
  var imgSetupForm = document.querySelector('.img-upload__form');
  var HASHTAG_ERRORS = {
    MIN_LENGTH: 'Хэш-тег должен состоять минимум из двух символов',
    HASHTAG_START: 'Хэш-тег должен начинаться с #',
    MAX_LENGTH: 'Один хэш-тег должен содержать не более 20 символов',
    HASHTAG_SPACE: 'Хэш-теги разделяются пробелами',
    MAX_COUNT: 'Не более пяти хэш-тегов',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды'
  };

  var validateForm = function () {
    var hashtagList = window.hashtags.hashtag.value;
    var hashtagLowerCase = hashtagList.toLowerCase();
    var hashtagItems = hashtagLowerCase.split(' ');

    if (hashtagItems.length > 5) {
      return HASHTAG_ERRORS.MAX_COUNT;
    }

    for (var i = 0; i < hashtagItems.length; i++) {
      if (hashtagItems[i].length === 1) {
        return HASHTAG_ERRORS.MIN_LENGTH;
      }
      if (hashtagItems[i][0] !== '#') {
        return HASHTAG_ERRORS.HASHTAG_START;
      }
      if (hashtagItems[i].length > 20) {
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

  window.hashtags.hashtag.addEventListener('input', function () {
    var errorMessage = validateForm();

    if (errorMessage !== true) {
      window.hashtags.hashtag.setCustomValidity(errorMessage);
      window.hashtags.hashtag.style.borderColor = 'red';
    } else {
      window.hashtags.hashtag.setCustomValidity('');
      window.hashtags.hashtag.style.borderColor = '';
    }
  });

  imgSetupForm.addEventListener('submit', function (evt) {
    var validated = validateForm();
    if (validated !== true) {
      evt.preventDefault();
    }
  });
})();
