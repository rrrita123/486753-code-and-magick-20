'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 280;
var GAP_X = 50;
var GAP_Y = 30;
var GAP_FOND = 16;
var TEXT_HEIGHT = 20;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var COLOR_TEXT = '#000';
var barHeight = (COLUMN_MAX_HEIGHT - GAP_Y - TEXT_HEIGHT) * -1;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandom = function () {
  return Math.floor(Math.random() * 100);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i <= arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.font = GAP_FOND + 'px PT Mono';
  ctx.textBaseLine = 'hanging';
  ctx.fillStyle = COLOR_TEXT;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_X, GAP_Y + TEXT_HEIGHT);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(players[i], CLOUD_X + GAP_X + (COLUMN_WIDTH + GAP_X) * i, CLOUD_Y - GAP_Y);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturate = getRandom();
      ctx.fillStyle = 'hsl(240,' + saturate + '%, 50%)';
    }

    var maxTime = getMaxElement(times);
    var timeColumn = Math.round((barHeight * times[i]) / maxTime);

    ctx.fillRect(CLOUD_X + GAP_X + (COLUMN_WIDTH + GAP_X) * i, CLOUD_Y - GAP_Y - TEXT_HEIGHT, COLUMN_WIDTH, timeColumn);

    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + (COLUMN_WIDTH + GAP_X) * i, CLOUD_Y - GAP_Y + timeColumn - TEXT_HEIGHT - GAP_FOND);
  }
};
