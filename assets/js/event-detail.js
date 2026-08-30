(function () {
  'use strict';

  var eventId = new URLSearchParams(window.location.search).get('event');
  var details = document.querySelectorAll('[data-event-detail]');
  var active = null;

  for (var i = 0; i < details.length; i += 1) {
    if (details[i].dataset.eventDetail === eventId) {
      active = details[i];
      break;
    }
  }

  if (!active) {
    var notFound = document.querySelector('[data-event-not-found]');
    if (notFound) notFound.hidden = false;
    return;
  }

  active.hidden = false;

  var titleNode = active.querySelector('h1');
  var eventTitle = titleNode ? titleNode.textContent.trim() : 'PyData St. Louis Event';
  var eventDate = active.dataset.eventDate || '';
  var eventLocation = active.dataset.eventLocation || '';
  var summary = active.dataset.eventSummary || 'PyData St. Louis meetup details, speakers, agenda, and recordings.';

  document.title = eventTitle + ' | PyData St. Louis';

  var metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', summary);

  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = window.location.href;

  [
    ['meta[property="og:title"]', eventTitle],
    ['meta[property="og:description"]', summary],
    ['meta[name="twitter:title"]', eventTitle],
    ['meta[name="twitter:description"]', summary]
  ].forEach(function (pair) {
    var selector = pair[0];
    var value = pair[1];
    var tag = document.querySelector(selector);
    if (tag) tag.setAttribute('content', value);
  });

  var eventUrl = window.location.origin + window.location.pathname + '?event=' + encodeURIComponent(eventId);
  var eventJson = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': eventTitle,
    'description': summary,
    'url': eventUrl,
    'startDate': eventDate || undefined,
    'location': eventLocation ? { '@type': 'Place', 'name': eventLocation } : undefined,
    'organizer': { '@type': 'Organization', 'name': 'PyData St. Louis' }
  };

  var existingEventScript = document.getElementById('event-schema');
  if (existingEventScript) existingEventScript.remove();

  var script = document.createElement('script');
  script.id = 'event-schema';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(eventJson);
  document.head.appendChild(script);

  function youtubeEmbedUrl(rawUrl) {
    try {
      var url = new URL(rawUrl);
      var host = url.hostname.replace(/^www\./, '');
      var videoId = '';

      if (host === 'youtu.be') {
        videoId = url.pathname.split('/')[1];
      } else if (host === 'youtube.com' || host === 'm.youtube.com') {
        if (url.pathname === '/watch') videoId = url.searchParams.get('v');
        if (url.pathname.indexOf('/embed/') === 0 || url.pathname.indexOf('/shorts/') === 0) {
          videoId = url.pathname.split('/')[2];
        }
      }

      if (!videoId || !/^[A-Za-z0-9_-]{6,20}$/.test(videoId)) return null;
      return 'https://www.youtube-nocookie.com/embed/' + videoId;
    } catch (error) {
      return null;
    }
  }

  var videoSection = active.querySelector('[data-youtube-url]');
  if (videoSection) {
    var embedUrl = youtubeEmbedUrl(videoSection.dataset.youtubeUrl);
    var frameWrap = videoSection.querySelector('[data-youtube-frame]');
    if (embedUrl && frameWrap) {
      var iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = 'YouTube event recording';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      frameWrap.appendChild(iframe);
    }
  }

  var sliderRoot = active.querySelector('[data-event-slider]');
  if (!sliderRoot) return;
  var slider = sliderRoot.querySelector('.slider');
  var slides = sliderRoot.querySelectorAll('.slide');
  var dots = sliderRoot.querySelectorAll('.dot');
  var prev = sliderRoot.querySelector('.prev');
  var next = sliderRoot.querySelector('.next');
  var index = 0;

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
    for (var dotIndex = 0; dotIndex < dots.length; dotIndex += 1) {
      dots[dotIndex].classList.toggle('active', dotIndex === index);
    }
  }

  if (slides.length <= 1) {
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
  }
  if (prev) prev.addEventListener('click', function () { show(index - 1); });
  if (next) next.addEventListener('click', function () { show(index + 1); });
  for (var dotIndex = 0; dotIndex < dots.length; dotIndex += 1) {
    (function (selectedIndex) {
      dots[selectedIndex].addEventListener('click', function () { show(selectedIndex); });
    }(dotIndex));
  }
}());
