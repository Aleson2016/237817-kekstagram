'use strict';

(function () {

  var createPicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureItem;
  };

  var showPhoto = function (picture, photo) {
    photo.addEventListener('click', function () {
      window.preview(picture);
    });
  };

  var showPopular = function () {
    renderPictures(pictures);
  };

  var showRandom = function () {
    var randomPictures = [];
    while (randomPictures.length < 10) {
      var index = photos.getNumber(0, pictures.length - 1);
      if (randomPictures.indexOf(pictures[index]) === -1) {
        randomPictures.push(pictures[index]);
      }
    }
    renderPictures(randomPictures);
  };

  var showDiscussed = function () {
    var discussedPictures = Array.from(pictures);
    discussedPictures.sort(function (a, b) {
      return a.comments.length > b.comments.length ? -1 : 1;
    });
    renderPictures(discussedPictures);
  };

  var renderPictures = function (pics) {
    pics.forEach(function (pic) {
      var photo = createPicture(pic);
      showPhoto(pic, photo);
      userPictures.appendChild(photo);
    });
  };

  var removePictures = function () {
    var elements = userPictures.querySelectorAll('.picture__link');
    elements.forEach(function (element) {
      element.remove();
    });
  };

  var activateButton = function (button) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    button.classList.add('img-filters__button--active');
  };

  var successHandler = function (data) {
    pictures = data;

    showPopular();

    imgFilter.classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', function (evt) {
      for (var i = 0; i < filterButtons.length; i++) {
        if (filterButtons[i] === evt.target) {
          activateButton(filterButtons[i]);
          removePictures();
        }
        if (evt.target === filterPopular) {
          showPopular();
        } else if (evt.target === filterNew) {
          showRandom();
        } else if (evt.target === filterDiscussed) {
          showDiscussed();
        }
      }
    });
  };

  var photos = {
    KEYCODE_ESC: 27,
    bigPicture: document.querySelector('.big-picture'),
    getNumber: function (min, max) {
      return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
  };

  window.photos = photos;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var userPictures = document.querySelector('.pictures');

  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var imgFilter = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');

  var filterButtons = imgFilter.querySelectorAll('.img-filters__button');
  var pictures = [];

  window.backend.download(successHandler, function (status, statusText) {
    if (status === 0) {
      window.backend.onError('Произошла ошибка соединения');
    } else {
      window.backend.onError('Cтатус ответа: ' + status + ' ' + statusText);
    }
  });
})();
