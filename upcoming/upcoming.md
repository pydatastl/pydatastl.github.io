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
	<h1>Upcoming PyData STL Meetups</h1>
	<p class="lede">See what is on the calendar and RSVP to join us.</p>
</section>

<section class="meetups-section">
	{% assign upcoming_pages = site.pages | where: "parent", "upcoming meetups" | sort: "nav_order" %}
	{% if upcoming_pages.size > 0 %}
		<div class="meetups-grid">
			{% for meetup in upcoming_pages %}
				<div class="meetup-card">
					<h2><a href="{{ meetup.url | relative_url }}">{{ meetup.title }}</a></h2>
					{% if meetup.description %}
						<p>{{ meetup.description }}</p>
					{% endif %}
				</div>
			{% endfor %}
		</div>
	{% else %}
		<p class="lede">New meetups are being scheduled. Check back soon.</p>
	{% endif %}
</section>
