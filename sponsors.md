---
layout: default
title: Sponsors
description: Sponsors supporting the PyData St. Louis community.
nav_order: 4
permalink: /sponsors/
---

<section class="hero">
  <p class="eyebrow">Sponsors</p>
  <h1>Sponsors</h1>
  <p class="lede">Organizations supporting our community through sponsorships and partnerships.</p>
</section>

<section class="meetups-section">
  {% assign sponsors = site.data.sponsors | sort: "name" %}
  {% if sponsors.size > 0 %}
    <div class="sponsors-grid">
      {% for sponsor in sponsors %}
        <div class="sponsor-card">
          {% if sponsor.logo %}
            <div class="sponsor-logo">
              <img src="{{ sponsor.logo | relative_url }}" alt="{{ sponsor.name | escape }} logo">
            </div>
          {% endif %}
          <div class="sponsor-body">
            <h2>{{ sponsor.name }}</h2>
            {% if sponsor.type %}
              <p class="sponsor-type">{{ sponsor.type }}</p>
            {% endif %}
            {% if sponsor.description %}
              <p>{{ sponsor.description }}</p>
            {% endif %}
            {% if sponsor.link %}
              <p><a class="button" href="{{ sponsor.link }}">Visit site</a></p>
            {% endif %}
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="lede">Sponsor details will be added soon.</p>
  {% endif %}
</section>
