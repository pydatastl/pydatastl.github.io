(function () {
  'use strict';

  var list = document.querySelector('[data-meetup-list]');
  if (!list) return;

  function currentChicagoTime() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    var values = {};

    for (var index = 0; index < parts.length; index += 1) {
      if (parts[index].type !== 'literal') values[parts[index].type] = parts[index].value;
    }

    return {
      date: values.year + '-' + values.month + '-' + values.day,
      minutes: Number(values.hour) * 60 + Number(values.minute)
    };
  }

  function minutesFromTime(value) {
    if (!value) return 24 * 60;
    var match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([AP]M)$/i);
    if (!match) return 24 * 60;
    var hour = Number(match[1]) % 12;
    if (match[3].toUpperCase() === 'PM') hour += 12;
    return hour * 60 + Number(match[2] || 0);
  }

  function updateMeetups() {
    var now = currentChicagoTime();
    var wantedStatus = list.dataset.meetupList;
    var cards = list.querySelectorAll('[data-meetup-date]');
    var visibleCount = 0;

    for (var cardIndex = 0; cardIndex < cards.length; cardIndex += 1) {
      var card = cards[cardIndex];
      var eventDate = card.dataset.meetupDate;
      var eventMinutes = minutesFromTime(card.dataset.meetupTime);
      var isPast = eventDate < now.date || (eventDate === now.date && now.minutes >= eventMinutes);
      var show;
      if (wantedStatus === 'past') {
        show = isPast;
      } else if (wantedStatus === 'next') {
        show = !isPast && visibleCount === 0;
      } else {
        show = !isPast;
      }
      card.hidden = !show;
      if (show) visibleCount += 1;
    }

    var emptyMessage = document.querySelector('[data-meetup-empty]');
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
    list.hidden = visibleCount === 0;
  }

  updateMeetups();
}());
