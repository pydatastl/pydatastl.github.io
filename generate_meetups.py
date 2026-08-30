import json
import re
from pathlib import Path


def yaml_quote(value: str) -> str:
    cleaned = str(value).replace("'", "''")
    return f"'{cleaned}'"


root = Path(__file__).resolve().parent
meetups_path = root / '_data' / 'meetups.json'
output_dir = root / 'meetups'
output_dir.mkdir(exist_ok=True)

with meetups_path.open('r', encoding='utf-8') as f:
    meetups = json.load(f)

for meetup in meetups:
    title = meetup['title']
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    description = ' '.join(meetup.get('description', [])[:2])
    description = re.sub(r'\s+', ' ', description).strip()
    page = output_dir / f'{slug}.md'
    content = f'''---
layout: event-page
title: {yaml_quote(title)}
description: {yaml_quote(description)}
permalink: /meetups/{slug}/
meetup_title: {yaml_quote(title)}
---

<section class="hero">
  <p class="eyebrow">Event</p>
  <h1>{title}</h1>
  <p class="lede">{meetup.get('date', '')}{' · ' + meetup.get('time', '') if meetup.get('time') else ''}</p>
  {f'<p>{meetup.get("location", "")}</p>' if meetup.get('location') else ''}
</section>
'''
    page.write_text(content, encoding='utf-8')

print(f'Generated {len(meetups)} meetup pages in {output_dir}')
