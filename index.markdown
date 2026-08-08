---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: home
nav_order: 1
description: PyData St. Louis is a community for developers and users of open source data tools.
permalink: /

---

<section class="hero">
	<p class="eyebrow">Community-led data talks</p>
	<h1>PyData St. Louis</h1>
	<p class="lede">A community for developers and users of open source data tools.</p>
	<div class="cta-row">
		<a class="button primary" href="https://forms.gle/7moSKLvQjrFRuYtCA">Propose a Talk or Tutorial</a>
		<a class="button" href="https://www.meetup.com/pydata-st-louis/">RSVP for Upcoming Meetup</a>
	</div>
</section>

{% assign news_items = site.news | sort: "scheduled_date" | reverse %}
{% if news_items.size > 0 %}
<section class="news-panel" data-news-panel data-news-limit="3" data-news-baseurl="{{ site.baseurl }}" hidden>
	<div class="news-panel-heading">
		<p class="eyebrow">Latest updates</p>
		<h2>News</h2>
	</div>
	<div class="news-list">
		{% for news_item in news_items %}
			<article class="news-item" data-news-item data-news-date="{{ news_item.scheduled_date | date: '%Y-%m-%d' }}"{% if news_item.end_date %} data-news-end-date="{{ news_item.end_date | date: '%Y-%m-%d' }}"{% endif %} hidden>
				{% if news_item.cover_image %}
					<img class="news-cover" src="{{ news_item.cover_image | relative_url }}" alt="{{ news_item.cover_image_alt | default: news_item.title | escape }}">
				{% endif %}
				<header>
					<h3>{{ news_item.title | escape }}</h3>
					<time datetime="{{ news_item.scheduled_date | date: '%Y-%m-%d' }}">{{ news_item.scheduled_date | date: '%B %-d, %Y' }}</time>
				</header>
				<div class="news-item-content">{{ news_item.content }}</div>
			</article>
		{% endfor %}
	</div>
</section>
<script src="{{ '/assets/js/news.js' | relative_url }}"></script>
{% endif %}


{% assign meetups = site.data.meetups | sort: "date" %}

<section class="meetups-section">
	<h2>Next meetup</h2>
	<div class="meetups-grid" data-meetup-list="next">
		{% for meetup in meetups %}
			<div class="meetup-card" data-meetup-date="{{ meetup.date }}" data-meetup-time="{{ meetup.end_time | default: meetup.time | escape }}" hidden>
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
	<p class="lede" data-meetup-empty hidden>No upcoming meetups listed yet.</p>
	<noscript><p class="lede">Enable JavaScript to view the next meetup.</p></noscript>
</section>

<script src="{{ '/assets/js/meetup-status.js' | relative_url }}"></script>

<section class="meetup-slider">
	<div class="slider-container">
		{% assign meetup_images = site.static_files | where_exp: "file", "file.path contains '/assets/images/meetup/'" | sort: "path" %}
		<div class="slider" data-slider>
			{% if meetup_images.size > 0 %}
				{% for image in meetup_images %}
					<div class="slide">
						<img src="{{ image.path | relative_url }}" alt="PyData St. Louis meetup photo {{ forloop.index }}">
					</div>
				{% endfor %}
			{% else %}
				<div class="slide">
					<img src="/assets/images/pydatastl.jpg" alt="PyData St. Louis community photo">
				</div>
			{% endif %}
		</div>
		<button class="slider-nav prev" type="button" aria-label="Previous slide">&#x2039;</button>
		<button class="slider-nav next" type="button" aria-label="Next slide">&#x203A;</button>
		<div class="slider-dots" data-dots>
			{% if meetup_images.size > 0 %}
				{% for image in meetup_images %}
					<button class="dot" type="button" aria-label="Go to slide {{ forloop.index }}"></button>
				{% endfor %}
			{% else %}
				<button class="dot active" type="button" aria-label="Go to slide 1"></button>
			{% endif %}
		</div>
	</div>
</section>

<script src="{{ '/assets/js/slider.js' | relative_url }}"></script>

<section class="meetups-section">
	<p class="acm-badge">Our mission</p>
	<p class="lede">PyData is an educational program of NumFOCUS, a 501(c)3 nonprofit. We bring the global PyData network to St. Louis with accessible, community-driven meetups and workshops for data practitioners at every level.</p>
	<div class="event-grid">
		<article>
			<h2>Speaking at PyData St. Louis</h2>
			<p>Share a talk, tutorial, or lightning talk about open-source tools, data engineering, visualization, computer vision, or NLP.</p>
			<p><a class="button" href="https://forms.gle/7moSKLvQjrFRuYtCA">Submit your idea</a></p>
		</article>
		<article>
			<h2>Volunteer with us</h2>
			<p>Help organize monthly meetups, run logistics, or host workshops. We would love to have you on the team.</p>
			<p><a class="button" href="mailto:gauba.aayush@gmail.com">Email the organizers</a></p>
		</article>
	</div>
</section>
