---
layout: default
title: PyData St. Louis Meetup Events
description: Explore upcoming and past PyData St. Louis meetup events, recordings, and community learning opportunities.
permalink: /meetups/
---

{% assign meetups = site.data.meetups | sort: "date" | reverse %}

<section class="hero">
  <p class="eyebrow">Events</p>
  <h1>PyData St. Louis meetups</h1>
  <p class="lede">Browse upcoming and past community events in the St. Louis Python and data ecosystem.</p>
</section>

<section class="meetups-section">
  <div class="meetups-grid">
    {% for meetup in meetups %}
      {% assign event_slug = meetup.title | slugify %}
      <article class="meetup-card">
        <h2><a href="{{ '/meetups/' | relative_url }}{{ event_slug }}/">{{ meetup.title | escape }}</a></h2>
        <p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
        {% if meetup.location %}<p>{{ meetup.location | escape }}</p>{% endif %}
        {% if meetup.description %}
          {% assign summary = meetup.description | join: ' ' | truncate: 180, '...' %}
          <p>{{ summary | escape }}</p>
        {% endif %}
        <p class="cta-row">
          <a class="button primary" href="{{ '/meetups/' | relative_url }}{{ event_slug }}/">Event details</a>
          {% if meetup.rsvp_url %}<a class="button" href="{{ meetup.rsvp_url }}" target="_blank" rel="noopener noreferrer">RSVP</a>{% endif %}
        </p>
      </article>
    {% endfor %}
  </div>
</section>
