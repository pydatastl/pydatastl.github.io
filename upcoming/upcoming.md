---
layout: default
title: upcoming meetups
description: List of Upcoming PyData STL
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
	{% assign now_ts = "now" | date: "%s" %}
	{% assign today_str = "now" | date: "%Y-%m-%d" %}
	{% assign meetups = site.data.meetups | sort: "date" %}
	{% assign upcoming = "" | split: "" %}
	{% for meetup in meetups %}
		{% if meetup.date == today_str %}
			{% assign upcoming = upcoming | push: meetup %}
		{% else %}
			{% assign meetup_ts = meetup.date | date: "%s" %}
			{% if meetup_ts > now_ts %}
				{% assign upcoming = upcoming | push: meetup %}
			{% endif %}
		{% endif %}
	{% endfor %}
	{% if upcoming.size > 0 %}
		<div class="meetups-grid">
			{% for meetup in upcoming %}
				<div class="meetup-card">
					<h2>{{ meetup.title }}</h2>
					<p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
					{% if meetup.location %}<p>{{ meetup.location }}</p>{% endif %}
					{% if meetup.description %}{% for paragraph in meetup.description %}<p>{{ paragraph | escape }}</p>{% endfor %}{% endif %}
					<p class="cta-row">
						<a class="button primary" href="{{ '/event/' | relative_url }}?event={{ meetup.title | slugify }}">Event details</a>
						{% if meetup.rsvp_url %}<a class="button" href="{{ meetup.rsvp_url }}">RSVP</a>{% endif %}
					</p>
				</div>
			{% endfor %}
		</div>
	{% else %}
		<p class="lede">New meetups are being scheduled. Check back soon.</p>
	{% endif %}
</section>
