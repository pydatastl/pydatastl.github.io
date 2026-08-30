---
layout: default
title: Upcoming PyData St. Louis Meetups
description: Find upcoming PyData St. Louis meetups, workshops, and community events in the St. Louis area.
nav_order: 3
has_children: true
permalink: /upcoming_meetups/
---

<section class="hero">
	<p class="eyebrow">Upcoming</p>
	<h1>Upcoming Meetups</h1>
	<p class="lede">See what is on the calendar and RSVP to join us.</p>
</section>

<section class="meetups-section">
	{% assign meetups = site.data.meetups | sort: "date" %}
	<div class="meetups-grid" data-meetup-list="upcoming">
		{% for meetup in meetups %}
			<div class="meetup-card" data-meetup-date="{{ meetup.date }}" data-meetup-time="{{ meetup.end_time | default: meetup.time | escape }}" hidden>
					<h2>{{ meetup.title }}</h2>
					<p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
					{% if meetup.location %}<p>{{ meetup.location }}</p>{% endif %}
					{% if meetup.description %}{% for paragraph in meetup.description %}<p>{{ paragraph | escape }}</p>{% endfor %}{% endif %}
					<p class="cta-row">
						<a class="button primary" href="{{ '/meetups/' | relative_url }}{{ meetup.title | slugify }}/">Event details</a>
						{% if meetup.rsvp_url %}<a class="button" href="{{ meetup.rsvp_url }}">RSVP</a>{% endif %}
					</p>
			</div>
		{% endfor %}
	</div>
	<p class="lede" data-meetup-empty hidden>New meetups are being scheduled. Check back soon.</p>
	<noscript><p class="lede">Enable JavaScript to view meetups by their current status.</p></noscript>
</section>

<script src="{{ '/assets/js/meetup-status.js' | relative_url }}"></script>
