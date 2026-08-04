# PyData St. Louis Website

## Adding a past-meetup recording

Add optional `youtube_url` and `photo_directory` properties to a meetup in
`_data/meetups.json`:

```json
{
  "title": "Example meetup",
  "date": "2026-01-01",
  "description": [
    "The first paragraph of the event description.",
    "The second paragraph of the event description."
  ],
  "youtube_url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "photo_directory": "/assets/images/meetup/example-meetup/"
}
```

Every meetup has an **Event details** page. When `youtube_url` is present, that
page embeds the recording using YouTube's privacy-enhanced player. When
`photo_directory` contains supported image files, it also creates a photo
slider. With a recording, the slider appears after the event description;
without a recording, it appears between the title and description. Omit
`youtube_url` when no recording is available, and keep each event's photos in
its own directory. The first filename alphabetically is the initial photo, so
use names such as `01-cover.jpg`, `02-speaker.jpg`, and `03-audience.jpg` to
control the order. A separate `image` property is not needed.

### Adding speaker profiles

Add an optional `speakers` array to a meetup to show speaker information on its
Event details page. Multiple speakers are supported. Each social media property
is optional, so include only the profiles the speaker has:

```json
"speakers": [
  {
    "name": "Speaker name",
    "photo": "/assets/images/speakers/speaker-name.jpg",
    "description": [
      "A short biography or introduction.",
      "An optional second paragraph."
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/in/example/",
      "mastodon": "https://mastodon.social/@example",
      "bluesky": "https://bsky.app/profile/example.bsky.social",
      "x": "https://x.com/example",
      "youtube": "https://www.youtube.com/@example"
    }
  }
]
```

Store speaker photos under `assets/images/speakers/`. If a photo is omitted,
the speaker's first initial is displayed instead. `description` may be either a
single string or an array of paragraphs.

## Adding an organizer

Add organizer profiles to `_data/organizers.json`:

```json
{
  "name": "Organizer name",
  "position": "Organizer position",
  "photo": "/assets/images/organizers/organizer-name.jpg",
  "description": [
    "The first paragraph about this organizer.",
    "An optional second paragraph."
  ]
}
```

The Organizers page is generated from this file, preserves the order of the
profiles in the JSON array, and appears in the site navigation automatically.
The `photo` field is optional; when it is omitted, the card displays the
organizer's first initial. Store organizer photos under
`assets/images/organizers/`.
