---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: home
nav_order: 1
description: PyData STL is a community for developers and users of open source data tools.
permalink: /

---

<section class="hero">
	<p class="eyebrow">Community-led data talks</p>
	<h1>PyData STL</h1>
	<p class="lede">A community for developers and users of open source data tools.</p>
	<div class="cta-row">
		<a class="button primary" href="https://forms.gle/7moSKLvQjrFRuYtCA">Propose a Talk or Tutorial</a>
		<a class="button" href="https://www.meetup.com/pydata-st-louis/">RSVP for Upcoming Meetup</a>
	</div>
</section>


{% assign now_ts = "now" | date: "%s" %}
{% assign today_str = "now" | date: "%Y-%m-%d" %}
{% assign meetups = site.data.meetups | sort: "date" %}

<section class="meetups-section">
	<h2>Next meetup</h2>
	{% assign todays = "" | split: "" %}
	{% assign upcoming = "" | split: "" %}
	{% for meetup in meetups %}
		{% if meetup.date == today_str %}
			{% assign todays = todays | push: meetup %}
		{% else %}
			{% assign meetup_ts = meetup.date | date: "%s" %}
			{% if meetup_ts > now_ts %}
				{% assign upcoming = upcoming | push: meetup %}
			{% endif %}
		{% endif %}
	{% endfor %}

	{% if todays.size > 0 %}
		<div class="meetups-grid">
			{% for meetup in todays %}
				<div class="meetup-card">
					<h2>{{ meetup.title }}</h2>
					<p>{{ meetup.date }}{% if meetup.time %} · {{ meetup.time }}{% endif %}</p>
					{% if meetup.location %}<p>{{ meetup.location }}</p>{% endif %}
					{% if meetup.description %}<p>{{ meetup.description }}</p>{% endif %}
					{% if meetup.rsvp_url %}<p><a class="button" href="{{ meetup.rsvp_url }}">RSVP</a></p>{% endif %}
				</div>
			{% endfor %}
		</div>
	{% elsif upcoming.size > 0 %}
		{% assign next_meetup = upcoming[0] %}
		<div class="meetups-grid">
			<div class="meetup-card">
				<h2>{{ next_meetup.title }}</h2>
				<p>{{ next_meetup.date }}{% if next_meetup.time %} · {{ next_meetup.time }}{% endif %}</p>
				{% if next_meetup.location %}<p>{{ next_meetup.location }}</p>{% endif %}
				{% if next_meetup.description %}<p>{{ next_meetup.description }}</p>{% endif %}
				{% if next_meetup.rsvp_url %}<p><a class="button" href="{{ next_meetup.rsvp_url }}">RSVP</a></p>{% endif %}
			</div>
		</div>
	{% else %}
		<p class="lede">No upcoming meetups listed yet.</p>
	{% endif %}
</section>

<section class="meetup-slider">
	<div class="slider-container">
		{% assign meetup_images = site.static_files | where_exp: "file", "file.path contains '/assets/images/meetup/'" | sort: "path" %}
		<div class="slider" data-slider>
			{% if meetup_images.size > 0 %}
				{% for image in meetup_images %}
					<div class="slide">
						<img src="{{ image.path | relative_url }}" alt="PyData STL meetup photo {{ forloop.index }}">
					</div>
				{% endfor %}
			{% else %}
				<div class="slide">
					<img src="/assets/images/pydatastl.jpg" alt="PyData STL community photo">
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

<script>
	(function () {
		var slider = document.querySelector('[data-slider]');
		var dotsWrap = document.querySelector('[data-dots]');
		if (!slider || !dotsWrap) return;
		var slides = slider.querySelectorAll('.slide');
		var dots = dotsWrap.querySelectorAll('.dot');
		var prevBtn = document.querySelector('.slider-nav.prev');
		var nextBtn = document.querySelector('.slider-nav.next');
		if (slides.length <= 1) {
			if (prevBtn) prevBtn.style.display = 'none';
			if (nextBtn) nextBtn.style.display = 'none';
			return;
		}
		var index = 0;
		var intervalId = null;
		function updateSlider() {
			slider.style.transform = 'translateX(' + (-index * 100) + '%)';
			for (var i = 0; i < dots.length; i += 1) {
				dots[i].classList.toggle('active', i === index);
			}
		}
		function goTo(nextIndex) {
			index = (nextIndex + slides.length) % slides.length;
			updateSlider();
		}
		function startAuto() {
			intervalId = window.setInterval(function () {
				goTo(index + 1);
			}, 5000);
		}
		function stopAuto() {
			if (intervalId) window.clearInterval(intervalId);
		}
		if (prevBtn) {
			prevBtn.addEventListener('click', function () {
				stopAuto();
				goTo(index - 1);
				startAuto();
			});
		}
		if (nextBtn) {
			nextBtn.addEventListener('click', function () {
				stopAuto();
				goTo(index + 1);
				startAuto();
			});
		}
		for (var j = 0; j < dots.length; j += 1) {
			(function (dotIndex) {
				dots[dotIndex].addEventListener('click', function () {
					stopAuto();
					goTo(dotIndex);
					startAuto();
				});
			})(j);
		}
		updateSlider();
		startAuto();
	})();
</script>

<section class="meetups-section">
	<p class="acm-badge">Our mission</p>
	<p class="lede">PyData is an educational program of NumFOCUS, a 501(c)3 nonprofit. We bring the global PyData network to St. Louis with accessible, community-driven meetups and workshops for data practitioners at every level.</p>
	<div class="event-grid">
		<article>
			<h2>Speaking at PyData STL</h2>
			<p>Share a talk, tutorial, or lightning talk about open-source tools, data engineering, visualization, computer vision, or NLP.</p>
			<p><a class="button" href="https://forms.gle/7moSKLvQjrFRuYtCA">Submit your idea</a></p>
		</article>
		<article>
			<h2>Volunteer with us</h2>
			<p>Help organize monthly meetups, run logistics, or host workshops. We would love to have you on the team.</p>
			<p><a class="button" href="mailto:stl@pydata.org">Email the organizers</a></p>
		</article>
	</div>
</section>

