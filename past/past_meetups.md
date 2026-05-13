---
layout: default
title: past meetups
description: List of Past PyData STL
nav_order: 2
has_children: true
permalink: /past_meetups/
---

<section class="hero">
	<p class="eyebrow">Archive</p>
	<h1>Past PyData STL Meetups</h1>
	<p class="lede">Browse previous meetups, agendas, and notes.</p>
</section>

<section class="meetups-section">
	{% assign now_ts = "now" | date: "%s" %}
	{% assign today_str = "now" | date: "%Y-%m-%d" %}
	{% assign meetups = site.data.meetups | sort: "date" | reverse %}
	{% assign past = "" | split: "" %}
	{% for meetup in meetups %}
		{% if meetup.date != today_str %}
			{% assign meetup_ts = meetup.date | date: "%s" %}
			{% if meetup_ts < now_ts %}
				{% assign past = past | push: meetup %}
			{% endif %}
		{% endif %}
	{% endfor %}
	{% if past.size > 0 %}
		<div class="meetups-grid">
			{% for meetup in past %}
				<div class="meetup-card">
					<h2>{{ meetup.title }}</h2>
					<p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
					{% if meetup.location %}<p>{{ meetup.location }}</p>{% endif %}
					{% if meetup.description %}<p>{{ meetup.description }}</p>{% endif %}
					{% if meetup.rsvp_url %}<p><a class="button" href="{{ meetup.rsvp_url }}">Meetup link</a></p>{% endif %}
				</div>
			{% endfor %}
		</div>
	{% else %}
		<p class="lede">No past meetups are listed yet.</p>
	{% endif %}
</section>
