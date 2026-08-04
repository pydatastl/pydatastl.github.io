---
layout: default
title: Event details
description: PyData St. Louis meetup details, recordings, and photos.
permalink: /event/
---

<div data-event-not-found hidden>
  <section class="hero">
    <p class="eyebrow">Event</p>
    <h1>Event not found</h1>
    <p class="lede">This event may have moved or the link may be incomplete.</p>
    <p><a class="button" href="{{ '/past_meetups/' | relative_url }}">Browse past meetups</a></p>
  </section>
</div>

{% for meetup in site.data.meetups %}
  {% assign event_id = meetup.title | slugify %}
  <article class="event-detail-page" data-event-detail="{{ event_id }}" hidden>
    <section class="hero">
      <p class="eyebrow">Event</p>
      <h1>{{ meetup.title | escape }}</h1>
      <p class="lede">{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
      {% if meetup.location %}<p>{{ meetup.location | escape }}</p>{% endif %}
    </section>

    {% assign event_images = "" | split: "" %}
    {% if meetup.photo_directory %}
      {% for file in site.static_files %}
        {% if file.path contains meetup.photo_directory %}
          {% assign extension = file.extname | downcase %}
          {% if extension == '.jpg' or extension == '.jpeg' or extension == '.png' or extension == '.webp' or extension == '.gif' %}
            {% assign event_images = event_images | push: file %}
          {% endif %}
        {% endif %}
      {% endfor %}
    {% endif %}
    {% assign event_images = event_images | sort: "path" %}

    {% if meetup.youtube_url %}
      <section class="event-media" data-youtube-url="{{ meetup.youtube_url | escape }}">
        <h2>Recording</h2>
        <div class="video-frame" data-youtube-frame></div>
      </section>
    {% elsif event_images.size > 0 %}
      {% include event_photos.html %}
    {% endif %}

    <section class="meetups-section event-detail-copy">
      {% if meetup.description %}
        <h2>About this event</h2>
        {% for paragraph in meetup.description %}<p>{{ paragraph | escape }}</p>{% endfor %}
      {% endif %}
      {% if meetup.agenda %}
        <h2>Agenda</h2>
        <ul>
          {% for item in meetup.agenda %}<li>{{ item | escape }}</li>{% endfor %}
        </ul>
      {% endif %}
      <p class="cta-row">
        {% if meetup.rsvp_url %}<a class="button" href="{{ meetup.rsvp_url }}" target="_blank" rel="noopener noreferrer">View on Meetup</a>{% endif %}
        {% if meetup.youtube_url %}<a class="button primary" href="{{ meetup.youtube_url }}" target="_blank" rel="noopener noreferrer">Open on YouTube</a>{% endif %}
      </p>
    </section>

    {% if meetup.speakers and meetup.speakers.size > 0 %}
      <section class="meetups-section event-speakers">
        <h2>{% if meetup.speakers.size == 1 %}Speaker{% else %}Speakers{% endif %}</h2>
        <div class="speaker-grid{% if meetup.speakers.size == 1 %} speaker-grid-single{% endif %}">
          {% for speaker in meetup.speakers %}
            <article class="speaker-card">
              {% if speaker.photo %}
                <img class="speaker-photo" src="{{ speaker.photo | relative_url }}" alt="{{ speaker.name | escape }}">
              {% else %}
                <div class="speaker-initial" aria-hidden="true">{{ speaker.name | slice: 0 | upcase }}</div>
              {% endif %}
              <div class="speaker-body">
                <h3>{{ speaker.name | escape }}</h3>
                {% if speaker.description %}
                  {% if speaker.description.first %}
                    {% for paragraph in speaker.description %}<p>{{ paragraph | escape }}</p>{% endfor %}
                  {% else %}
                    <p>{{ speaker.description | escape }}</p>
                  {% endif %}
                {% endif %}
                {% if speaker.social %}
                  <div class="speaker-socials" aria-label="{{ speaker.name | escape }} social media profiles">
                    {% if speaker.social.github %}{% assign profile_url = speaker.social.github %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="me noopener noreferrer" aria-label="{{ speaker.name | escape }} on GitHub" title="GitHub"><img src="{{ '/assets/images/github.svg' | relative_url }}" alt=""></a>{% endif %}
                    {% if speaker.social.linkedin %}{% assign profile_url = speaker.social.linkedin %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="noopener noreferrer" aria-label="{{ speaker.name | escape }} on LinkedIn" title="LinkedIn"><img src="{{ '/assets/images/linkedin.png' | relative_url }}" alt=""></a>{% endif %}
                    {% if speaker.social.mastodon %}{% assign profile_url = speaker.social.mastodon %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="me noopener noreferrer" aria-label="{{ speaker.name | escape }} on Mastodon" title="Mastodon"><img src="{{ '/assets/images/mastodon.svg' | relative_url }}" alt=""></a>{% endif %}
                    {% if speaker.social.bluesky %}{% assign profile_url = speaker.social.bluesky %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="me noopener noreferrer" aria-label="{{ speaker.name | escape }} on Bluesky" title="Bluesky"><img src="{{ '/assets/images/bluesky.svg' | relative_url }}" alt=""></a>{% endif %}
                    {% if speaker.social.x %}{% assign profile_url = speaker.social.x %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="me noopener noreferrer" aria-label="{{ speaker.name | escape }} on X" title="X"><img src="{{ '/assets/images/x.svg' | relative_url }}" alt=""></a>{% endif %}
                    {% if speaker.social.youtube %}{% assign profile_url = speaker.social.youtube %}{% unless profile_url contains '://' %}{% assign profile_url = 'https://' | append: profile_url %}{% endunless %}<a href="{{ profile_url | escape }}" target="_blank" rel="noopener noreferrer" aria-label="{{ speaker.name | escape }} on YouTube" title="YouTube"><img src="{{ '/assets/images/youtube.svg' | relative_url }}" alt=""></a>{% endif %}
                  </div>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      </section>
    {% endif %}

    {% if meetup.youtube_url and event_images.size > 0 %}
      {% include event_photos.html %}
    {% endif %}
  </article>
{% endfor %}

<script src="{{ '/assets/js/event-detail.js' | relative_url }}"></script>
