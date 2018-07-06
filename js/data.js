// 'use strict';
//
// (function () {
//   var PICTURE_COMMENTS = [
//     'Всё отлично!',
//     'В целом всё неплохо. Но не всё.',
//     'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//     'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//     'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//     'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
//   var PICTURE_DESCRIPTIONS = [
//     'Тестим новую камеру!',
//     'Затусили с друзьями на море',
//     'Как же круто тут кормят',
//     'Отдыхаем...',
//     'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//     'Вот это тачка!'
//   ];
//   var PICTURE_LIKES_MIN = 15;
//   var PICTURE_LIKES_MAX = 200;
//   var PICTURE_URL_MIN = 1;
//   var PICTURE_URL_MAX = 25;
//   var PICTURE_COUNT = 25;
//
//   var getNumber = function (min, max) {
//     return (Math.floor(Math.random() * (max - min + 1)) + min);
//   };
//
//   var pictureUrls = [];
//
//   while (pictureUrls.length < PICTURE_COUNT) {
//     var el = getNumber(PICTURE_URL_MIN, PICTURE_URL_MAX);
//     if (pictureUrls.indexOf(el) === -1) {
//       pictureUrls.push(el);
//     }
//   }
//
//   var rand = function (elements) {
//     var element = elements[Math.floor(Math.random() * elements.length)];
//     return element;
//   };
//
//   var createComment = function () {
//     var count = getNumber(1, 2);
//     var comment = '';
//     for (var i = 0; i < count; i++) {
//       comment = comment + rand(PICTURE_COMMENTS);
//     }
//     return comment;
//   };
//
//   var createComments = function () {
//     var commentNumber = getNumber(2, 4);
//     var commentGroup = [];
//     for (var i = 0; i < commentNumber; i++) {
//       commentGroup[i] = createComment();
//       commentGroup.push(commentGroup[i]);
//     }
//     return commentGroup;
//   };
//
//   window.data = [];
//   for (var i = 0; i < PICTURE_COUNT; i++) {
//     window.data.push({
//       url: 'photos/' + pictureUrls[i] + '.jpg',
//       likes: getNumber(PICTURE_LIKES_MIN, PICTURE_LIKES_MAX),
//       comments: createComments(),
//       description: rand(PICTURE_DESCRIPTIONS)
//     });
//   }
// })();
