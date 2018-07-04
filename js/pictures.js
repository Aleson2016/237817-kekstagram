'use strict';

var PICTURE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PICTURE_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var PICTURE_LIKES_MIN = 15;
var PICTURE_LIKES_MAX = 200;
var PICTURE_URL_MIN = 1;
var PICTURE_URL_MAX = 25;
var PICTURE_COUNT = 25;
var COMMENT_IMAGE_WIDTH = '35';

var getNumber = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

var pictureUrls = [];

while (pictureUrls.length < PICTURE_COUNT) {
  var el = getNumber(PICTURE_URL_MIN, PICTURE_URL_MAX);
  if (pictureUrls.indexOf(el) === -1) {
    pictureUrls.push(el);
  }
}

var rand = function (elements) {
  var element = elements[Math.floor(Math.random() * elements.length)];
  return element;
};

var createComment = function () {
  var count = getNumber(1, 2);
  var comment = '';
  for (var i = 0; i < count; i++) {
    comment = comment + rand(PICTURE_COMMENTS);
  }
  return comment;
};

var createComments = function () {
  var commentNumber = getNumber(2, 4);
  var commentGroup = [];
  for (var i = 0; i < commentNumber; i++) {
    commentGroup[i] = createComment();
    commentGroup.push(commentGroup[i]);
  }
  return commentGroup;
};

var pictures = [];
for (var i = 0; i < PICTURE_COUNT; i++) {
  pictures.push({
    url: 'photos/' + pictureUrls[i] + '.jpg',
    likes: getNumber(PICTURE_LIKES_MIN, PICTURE_LIKES_MAX),
    comments: createComments(),
    description: rand(PICTURE_DESCRIPTIONS)
  });
}

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var createPicture = function (picture) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = picture.url;
  pictureItem.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureItem.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return pictureItem;
};

var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

var makeItem = function (tagName, className, text) {
  var item = document.createElement(tagName);
  item.classList.add(className);
  if (text) {
    item.textContent = text;
  }
  return item;
};

var renderComment = function (comment) {
  var commentElement = makeItem('li', 'social__comment');
  commentElement.classList.add('social__comment--text');

  var commentImage = makeItem('img', 'social__picture');
  commentImage.src = 'img/avatar-' + getNumber(1, 6) + '.svg';
  commentImage.alt = 'Аватар комментатора фотографии';
  commentImage.width = COMMENT_IMAGE_WIDTH;
  commentImage.height = COMMENT_IMAGE_WIDTH;
  commentElement.appendChild(commentImage);

  var commentText = makeItem('p', 'social__text', comment);
  commentElement.appendChild(commentText);

  return commentElement;
};

var openBigPicture = function (picture) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderComment(picture.comments[i]));
  }

  var commentList = bigPicture.querySelector('.social__comments');
  commentList.innerHTML = '';
  commentList.appendChild(fragment);

  bigPicture.querySelector('.social__caption').textContent = picture.description;

  var commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('visually-hidden');

  var commentLoadmore = document.querySelector('.social__loadmore');
  commentLoadmore.classList.add('visually-hidden');
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

var clickPhoto = function (picture) {
  photo.addEventListener('click', function () {
    openBigPicture(picture);
  });
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  var photo = createPicture(pictures[i]);
  fragment.appendChild(photo);
  clickPhoto(pictures[i]);
}

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(fragment);

bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
});

// Открываем/закрываем окно
var KEYCODE_ESC = 27;
var uploadFile = document.querySelector('#upload-file');
var imgSetup = document.querySelector('.img-upload__overlay');
var imgSetupCancel = imgSetup.querySelector('#upload-cancel');

var onImgSetupEscPress = function (evt) {
  if (evt.keyCode === KEYCODE_ESC && evt.target !== hashtags && evt.target !== commentText) {
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
      imgPreview.classList.add(effects[effectRadio[i].id]);
    }
  }
  getDefaultScale();
  getDefaultSize();
});

imgSetupCancel.addEventListener('click', function () {
  closeImgSetup();
  for (var i = 0; i < effectRadio.length; i++) {
    if (effectRadio[i].checked) {
      imgPreview.classList.remove(effects[effectRadio[i].id]);
    }
  }
});

// масштаб
var STEP = 25;
var MIN_VALUE = 25;
var MAX_VALUE = 100;
var minusResize = imgSetup.querySelector('.resize__control--minus');
var plusResize = imgSetup.querySelector('.resize__control--plus');
var valueResize = imgSetup.querySelector('.resize__control--value');
var imgPreview = imgSetup.querySelector('.img-upload__preview');

var getDefaultSize = function () {
  valueResize.value = MAX_VALUE + '%';
  var valueResizeNumber = parseInt(valueResize.value, 10);
  var scaleValue = valueResizeNumber / 100;
  imgPreview.style.transform = 'scale(' + scaleValue + ')';
};

var resizeMinus = function () {
  var valueResizeNumber = parseInt(valueResize.value, 10);
  if (valueResizeNumber >= MIN_VALUE + STEP) {
    valueResizeNumber = valueResizeNumber - STEP;
    valueResize.value = valueResizeNumber + '%';
    var scaleValue = valueResizeNumber / 100;
    imgPreview.style.transform = 'scale(' + scaleValue + ')';
  }
};
var resizePlus = function () {
  var valueResizeNumber = parseInt(valueResize.value, 10);
  if (valueResizeNumber <= MAX_VALUE - STEP) {
    valueResizeNumber = valueResizeNumber + STEP;
    valueResize.value = valueResizeNumber + '%';
    var scaleValue = valueResizeNumber / 100;
    imgPreview.style.transform = 'scale(' + scaleValue + ')';
  }
};

minusResize.addEventListener('click', function () {
  resizeMinus();

});

plusResize.addEventListener('click', function () {
  resizePlus();
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
      imgPreview.style.filter = effectsScale[effectRadio[i].id];
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

  imgPreview.classList.add(effects[evt.target.id]);

  if (evt.target.id === 'effect-none') {
    hideScale();
  }

  for (var i = 0; i < effectRadio.length; i++) {
    if (effectRadio[i] !== evt.target) {
      imgPreview.classList.remove(effects[effectRadio[i].id]);
    }
  }
});

// хэш-теги, форма
var hashtags = imgSetup.querySelector('.text__hashtags');
var commentText = imgSetup.querySelector('.text__description');
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
  var hashtagList = hashtags.value;
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

hashtags.addEventListener('input', function () {
  var errorMessage = validateForm();

  if (errorMessage !== true) {
    hashtags.setCustomValidity(errorMessage);
    hashtags.style.borderColor = 'red';
  } else {
    hashtags.setCustomValidity('');
    hashtags.style.borderColor = '';
  }
});

imgSetupForm.addEventListener('submit', function (evt) {
  var validated = validateForm();
  if (validated !== true) {
    evt.preventDefault();
  }
});
