'use strict';

(function () {
  var COMMENT_IMAGE_WIDTH = '35';
  var COMMENT_COUNT_MAX = 5;

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
    commentImage.src = 'img/avatar-' + window.photos.getNumber(1, 6) + '.svg';
    commentImage.alt = 'Аватар комментатора фотографии';
    commentImage.width = COMMENT_IMAGE_WIDTH;
    commentImage.height = COMMENT_IMAGE_WIDTH;
    commentElement.appendChild(commentImage);

    var commentText = makeItem('p', 'social__text', comment);
    commentElement.appendChild(commentText);

    return commentElement;
  };

  var loadComments = function (picture, commentLoadmore) {
    var fragment = document.createDocumentFragment();

    var start = loadCommentsCount;
    loadCommentsCount = Math.min(loadCommentsCount + COMMENT_COUNT_MAX, (picture.comments.length));

    for (var i = start; i < loadCommentsCount; i++) {
      fragment.appendChild(renderComment(picture.comments[i]));
    }

    if (loadCommentsCount >= picture.comments.length) {
      commentLoadmore.classList.add('hidden');
    } else {
      commentLoadmore.classList.remove('hidden');
    }

    return fragment;
  };

  window.preview = function (picture) {
    loadCommentsCount = 0;

    window.photos.bigPicture.classList.remove('hidden');
    window.photos.bigPicture.querySelector('.big-picture__img img').src = picture.url;
    window.photos.bigPicture.querySelector('.likes-count').textContent = picture.likes;
    window.photos.bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    commentList.innerHTML = '';
    commentList.appendChild(loadComments(picture, commentLoadmore));

    window.photos.bigPicture.querySelector('.social__caption').textContent = picture.description;

    var commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');

    commentLoadmore.addEventListener('click', function () {
      commentList.appendChild(loadComments(picture, commentLoadmore));
    });

    document.addEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.photos.KEYCODE_ESC) {
      onCancelClick();
    }
  };

  var onCancelClick = function () {
    window.photos.bigPicture.classList.add('hidden');
    document.removeEventListener('click', onEscPress);
  };

  var commentList = window.photos.bigPicture.querySelector('.social__comments');
  var commentLoadmore = document.querySelector('.social__loadmore');
  var bigPictureCancel = window.photos.bigPicture.querySelector('#picture-cancel');
  var loadCommentsCount = 0;

  bigPictureCancel.addEventListener('click', onCancelClick);
})();
