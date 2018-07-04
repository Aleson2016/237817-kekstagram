'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var createPicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureItem;
  };

  var showPhoto = function (picture) {
    photo.addEventListener('click', function () {
      window.preview(picture);
    });
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.length; i++) {
    var photo = createPicture(window.data[i]);
    fragment.appendChild(photo);
    showPhoto(window.data[i]);
  }

  var pictureList = document.querySelector('.pictures');
  pictureList.appendChild(fragment);
})();
