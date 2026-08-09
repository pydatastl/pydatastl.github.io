(function () {
  'use strict';

  var panel = document.querySelector('[data-news-panel]');
  var newsRoot = document.querySelector('[data-news-baseurl]');

  function chicagoDate(date) {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date);
    var values = {};

    for (var index = 0; index < parts.length; index += 1) {
      if (parts[index].type !== 'literal') values[parts[index].type] = parts[index].value;
    }

    return values.year + '-' + values.month + '-' + values.day;
  }

  function currentServerTime() {
    var browserTime = new Date();
    if (!window.fetch) return Promise.resolve(browserTime);

    var baseUrl = newsRoot ? newsRoot.dataset.newsBaseurl || '' : '';
    var clockUrl = baseUrl.replace(/\/$/, '') + '/robots.txt?clock=' + Date.now();
    var serverRequest = window.fetch(clockUrl, {
      method: 'HEAD',
      cache: 'no-store',
      credentials: 'same-origin'
    }).then(function (response) {
      var dateHeader = response.headers.get('Date');
      if (!dateHeader) return browserTime;
      var serverDate = new Date(dateHeader);
      return Number.isNaN(serverDate.getTime()) ? browserTime : serverDate;
    }).catch(function () {
      return browserTime;
    });

    var timeout = new Promise(function (resolve) {
      window.setTimeout(function () { resolve(browserTime); }, 2000);
    });

    return Promise.race([serverRequest, timeout]);
  }

  function imageSource(path) {
    if (/^(?:https?:)?\/\//i.test(path) || path.indexOf('data:') === 0) return path;

    var baseUrl = newsRoot ? newsRoot.dataset.newsBaseurl || '' : '';
    return baseUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }

  function imageAlt(path) {
    var filename = path.split('/').pop().split('?')[0].split('#')[0];
    return filename
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .trim();
  }

  function renderBodyImages(content) {
    var paragraphs = content.querySelectorAll('p');

    for (var paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
      var paragraph = paragraphs[paragraphIndex];
      var match = paragraph.textContent.trim().match(/^img:\s*(.+)$/i);
      if (!match) continue;

      var path = match[1].trim();
      if (!path) continue;

      var image = document.createElement('img');
      image.className = 'news-body-image';
      image.src = imageSource(path);
      image.alt = imageAlt(path);
      image.loading = 'lazy';
      image.decoding = 'async';
      paragraph.replaceWith(image);
    }
  }

  var contentAreas = document.querySelectorAll('.news-item-content');
  for (var contentIndex = 0; contentIndex < contentAreas.length; contentIndex += 1) {
    renderBodyImages(contentAreas[contentIndex]);
  }

  if (!panel) return;

  function updateNews(now) {
    var today = chicagoDate(now);
    var limit = Number(panel.dataset.newsLimit) || Infinity;
    var items = panel.querySelectorAll('[data-news-item]');
    var visibleCount = 0;

    for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      var item = items[itemIndex];
      var hasStarted = item.dataset.newsDate <= today;
      var hasNotEnded = !item.dataset.newsEndDate || today <= item.dataset.newsEndDate;
      var show = hasStarted && hasNotEnded && visibleCount < limit;

      item.hidden = !show;
      if (show) visibleCount += 1;
    }

    panel.hidden = visibleCount === 0;
  }

  currentServerTime().then(updateNews);
}());
