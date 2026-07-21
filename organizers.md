---
layout: default
title: Organizers
description: Meet the volunteers who make PyData St. Louis possible.
nav_order: 5
permalink: /organizers/
---

<section class="hero organizers-hero">
  <p class="eyebrow">Our community</p>
  <h1>Organizers</h1>
  <p class="lede">PyData St. Louis would not be possible without these people. Their time, care, and volunteer work create a place where our data community can learn, connect, and grow.</p>
</section>

<section class="meetups-section">
  {% assign organizers = site.data.organizers | sort: "name" %}
  {% if organizers.size > 0 %}
    <div class="organizers-grid">
      {% for organizer in organizers %}
        <article class="organizer-card">
          {% if organizer.photo %}
            <img class="organizer-photo" src="{{ organizer.photo | relative_url }}" alt="{{ organizer.name | escape }}">
          {% else %}
            <div class="organizer-initial" aria-hidden="true">{{ organizer.name | slice: 0 | upcase }}</div>
          {% endif %}
          <div class="organizer-body">
            <h2>{{ organizer.name | escape }}</h2>
            <p class="organizer-position">{{ organizer.position | escape }}</p>
            {% if organizer.description %}
              {% for paragraph in organizer.description %}<p>{{ paragraph | escape }}</p>{% endfor %}
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p class="lede">Organizer profiles will be added soon.</p>
  {% endif %}
</section>
