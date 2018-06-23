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

while(pictureUrls.length < PICTURE_COUNT) {
  var el = getNumber(PICTURE_URL_MIN, PICTURE_URL_MAX);
  if (pictureUrls.indexOf(el) == -1) {
    pictureUrls.push(el);
  }
};

var rand = function (elements) {
  var element = elements[Math.floor(Math.random() * elements.length)];
  return element;
};

var createComment = function () {
  var count = getNumber(1,2);
  var comment = "";
  for ( var i = 0; i <  count; i++) {
    comment = comment + rand(PICTURE_COMMENTS);
  }
  return comment;
};

var createComments = function () {
  var commentNumber = getNumber(2,4);
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
  })
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var createPicture = function (picture) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = pictures[i].url;
  pictureItem.querySelector('.picture__stat--likes').textContent = pictures[i].likes;
  pictureItem.querySelector('.picture__stat--comments').textContent = pictures[i].comments.length;
  return pictureItem;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(createPicture(pictures[i]));
};

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(fragment);


var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').src = pictures[0].url;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;

var makeItem = function (tagName, className, text) {
  var item = document.createElement(tagName);
  item.classList.add(className);
  if (text) {
    item.textContent = text;
  }
  return item;
};

var renderComment = function (post) {
  var commentElement = makeItem('li', 'social__comment');
  commentElement.classList.add('social__comment--text');

  var commentImage = makeItem('img', 'social__picture');
  commentImage.src = 'img/avatar-' + getNumber(1, 6) + '.svg';
  commentImage.alt = 'Аватар комментатора фотографии';
  commentImage.width = COMMENT_IMAGE_WIDTH;
  commentImage.height = COMMENT_IMAGE_WIDTH;
  commentElement.appendChild(commentImage);

  var commentText = makeItem('p', 'social__text', post.comments[i]);
  commentElement.appendChild(commentText);

  return commentElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures[0].comments.length; i++) {
  fragment.appendChild(renderComment(pictures[0]));
};

var commentList = bigPicture.querySelector('.social__comments');
commentList.appendChild(fragment);

bigPicture.querySelector('.social__caption').textContent = pictures[0].description;

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');

var commentLoadmore = document.querySelector('.social__loadmore');
commentLoadmore.classList.add('visually-hidden');
