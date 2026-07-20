(function () {
  'use strict';

  var script = document.currentScript;
  var measurementId = script && script.dataset.measurementId;
  if (!measurementId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: script.dataset.anonymizeIp !== 'false'
  });
}());
