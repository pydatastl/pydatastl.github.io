---
layout: default
title: past meetups
description: List of Past PyData St. Louis meetups
nav_order: 2
has_children: true
permalink: /past_meetups/
---

<section class="hero">
	<p class="eyebrow">Archive</p>
	<h1>Past Meetups</h1>
	<p class="lede">Browse previous meetups, agendas, and notes.</p>
</section>

<section class="meetups-section">
	{% assign meetups = site.data.meetups | sort: "date" | reverse %}
	<div class="meetups-grid" data-meetup-list="past">
		{% for meetup in meetups %}
			<div class="meetup-card" data-meetup-date="{{ meetup.date }}" data-meetup-time="{{ meetup.end_time | default: meetup.time | escape }}" hidden>
					<h2>{{ meetup.title }}</h2>
					<p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
					{% if meetup.location %}<p>{{ meetup.location }}</p>{% endif %}
					{% if meetup.description %}{% for paragraph in meetup.description %}<p>{{ paragraph | escape }}</p>{% endfor %}{% endif %}
					<p class="cta-row">
						<a class="button primary" href="{{ '/event/' | relative_url }}?event={{ meetup.title | slugify }}">Event details</a>
						{% if meetup.rsvp_url %}<a class="button" href="{{ meetup.rsvp_url }}">Meetup link</a>{% endif %}
					</p>
			</div>
		{% endfor %}
	</div>
	<p class="lede" data-meetup-empty hidden>No past meetups are listed yet.</p>
	<noscript><p class="lede">Enable JavaScript to view meetups by their current status.</p></noscript>
</section>

<script src="{{ '/assets/js/meetup-status.js' | relative_url }}"></script>
