'use strict';

(function () {
  var COMMENT_IMAGE_WIDTH = '35';
  var COMMENT_COUNT_MAX = 5;

  var bigPicture = document.querySelector('.big-picture');

  var getNumber = function (min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  };

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

  var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

  window.preview = function (picture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    var loadComments = function (a) {
      var fragment = document.createDocumentFragment();
      for (var i = COMMENT_COUNT_MAX * a; i < COMMENT_COUNT_MAX * (a + 1); i++) {
        fragment.appendChild(renderComment(picture.comments[i]));
      }
      return fragment;
    };

    var commentList = bigPicture.querySelector('.social__comments');
    if (picture.commens.length <= COMMENT_COUNT_MAX) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < picture.commens.length; i++) {
        fragment.appendChild(renderComment(picture.comments[i]));
      }
      commentList.innerHTML = '';
      commentList.appendChild(fragment);
    } else {
      commentList.innerHTML = '';
      commentList.appendChild(loadComments(0));
    }

    var commentLoadmore = document.querySelector('.social__loadmore');
    var commentLoadCount = 1;
    commentLoadmore.addEventListener('click', function () {
      commentList.appendChild(loadComments(commentLoadCount));
      commentLoadCount = commentLoadCount + 1;

      var lastCount = Math.floor(picture.comments.length / 5);
      if ((commentLoadCount % 5) !== 0 && commentLoadCount > lastCount) {
        var fragment = document.createDocumentFragment();
        for (var i = COMMENT_COUNT_MAX * lastCount; i < picture.comments.length; i++) {
          fragment.appendChild(renderComment(picture.comments[i]));
        }
        commentList.appendChild(fragment);
        commentLoadmore.classList.add('hidden');
      }
    });

    bigPicture.querySelector('.social__caption').textContent = picture.description;

    var commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });
})();
