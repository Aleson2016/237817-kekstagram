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

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    var showPhoto = function (picture) {
      photo.addEventListener('click', function () {
        window.preview(picture);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          bigPicture.classList.add('hidden');
        }
      });
    };

    for (var i = 0; i < pictures.length; i++) {
      var photo = createPicture(pictures[i]);
      fragment.appendChild(photo);
      showPhoto(pictures[i]);
    }

    var pictureList = document.querySelector('.pictures');
    pictureList.appendChild(fragment);
  };

  window.backend.download(successHandler, window.backend.errorHandler);
})();
