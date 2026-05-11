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
	{% assign past_pages = site.pages | where: "parent", "past meetups" | sort: "nav_order" %}
	{% if past_pages.size > 0 %}
		<div class="meetups-grid">
			{% for meetup in past_pages %}
				<div class="meetup-card">
					<h2><a href="{{ meetup.url | relative_url }}">{{ meetup.title }}</a></h2>
					{% if meetup.description %}
						<p>{{ meetup.description }}</p>
					{% endif %}
				</div>
			{% endfor %}
		</div>
	{% else %}
		<p class="lede">No past meetups are listed yet.</p>
	{% endif %}
</section>
