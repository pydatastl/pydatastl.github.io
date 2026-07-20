(function () {
  'use strict';

  var slider = document.querySelector('[data-slider]');
  var dotsWrap = document.querySelector('[data-dots]');
  if (!slider || !dotsWrap) return;
  var slides = slider.querySelectorAll('.slide');
  var dots = dotsWrap.querySelectorAll('.dot');
  var prevBtn = document.querySelector('.slider-nav.prev');
  var nextBtn = document.querySelector('.slider-nav.next');
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    return;
  }
  var index = 0;
  var intervalId = null;
  function updateSlider() {
    slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
    for (var i = 0; i < dots.length; i += 1) {
      dots[i].classList.toggle('active', i === index);
    }
  }
  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    updateSlider();
  }
  function startAuto() {
    intervalId = window.setInterval(function () {
      goTo(index + 1);
    }, 5000);
  }
  function stopAuto() {
    if (intervalId) window.clearInterval(intervalId);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      stopAuto();
      goTo(index - 1);
      startAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      stopAuto();
      goTo(index + 1);
      startAuto();
    });
  }
  for (var j = 0; j < dots.length; j += 1) {
    (function (dotIndex) {
      dots[dotIndex].addEventListener('click', function () {
        stopAuto();
        goTo(dotIndex);
        startAuto();
      });
    }(j));
  }
  updateSlider();
  startAuto();
}());
