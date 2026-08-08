(function () {
  'use strict';

  var dropdowns = Array.prototype.slice.call(
    document.querySelectorAll('.nav-dropdown')
  );

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('toggle', function () {
      if (!dropdown.open) return;

      dropdowns.forEach(function (otherDropdown) {
        if (otherDropdown !== dropdown) otherDropdown.open = false;
      });
    });
  });

  document.addEventListener('click', function (event) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    dropdowns.forEach(function (dropdown) {
      if (!dropdown.open) return;
      dropdown.open = false;
      dropdown.querySelector('summary').focus();
    });
  });
})();
