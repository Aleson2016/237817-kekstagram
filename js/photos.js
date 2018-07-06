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
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        bigPicture.classList.add('hidden');
      }
    });
  };

  var showPopular = function () {
    renderPictures(pictures);
  };

  var showRandom = function () {
    var randomPictures = [];
    var getNumber = function (min, max) {
      return (Math.floor(Math.random() * (max - min + 1)) + min);
    };
    while (randomPictures.length < 10) {
      var index = getNumber(0, pictures.length - 1);
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
      pictureList.appendChild(photo);
    });
  };

  var removePictures = function () {
    var elements = pictureList.querySelectorAll('.picture__link');
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

    filterPopular.addEventListener('click', function () {
      activateButton(filterPopular);
      removePictures();
      showPopular();
    });
    filterNew.addEventListener('click', function () {
      activateButton(filterNew);
      removePictures();
      showRandom();
    });
    filterDiscussed.addEventListener('click', function () {
      activateButton(filterDiscussed);
      removePictures();
      showDiscussed();
    });
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var bigPicture = document.querySelector('.big-picture');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var imgFilter = document.querySelector('.img-filters');
  var pictureList = document.querySelector('.pictures');
  var filterButtons = imgFilter.querySelectorAll('.img-filters__button');
  var pictures = [];

  window.backend.download(successHandler, window.backend.errorHandler);
})();
