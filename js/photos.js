'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var bigPicture = document.querySelector('.big-picture');

  var createPicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureItem;
  };


  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var successHandler = function (pictures) {

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
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pictures.length; i++) {
        var photo = createPicture(pictures[i]);
        fragment.appendChild(photo);
        showPhoto(pictures[i], photo);
      }
      return fragment;
    };

    var showRandom = function () {
      var randomPictures = [];
      var getNumber = function (min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
      };
      while (randomPictures.length < 10) {
        var el = getNumber(0, randomPictures.length);
        if (randomPictures.indexOf(el) === -1) {
          randomPictures.push(el);
        }
      }
      var fragment = document.createDocumentFragment();
      randomPictures.forEach(function (picture) {
        var photo = createPicture(picture);
        fragment.appendChild(photo);
        showPhoto(picture, photo);
      });
      return fragment;
    };

    var pictureList = document.querySelector('.pictures');
    pictureList.appendChild(showPopular());

    var imgFilter = document.querySelector('.img-filters');
    imgFilter.classList.remove('.img-filters--inactive');

    filterPopular.addEventListener('click', function () {
      showPopular();
    });
    filterNew.addEventListener('click', function () {
      showRandom();
    });
    filterDiscussed.addEventListener('click', function () {

    });
  };

  window.backend.download(successHandler, window.backend.errorHandler);
})();
