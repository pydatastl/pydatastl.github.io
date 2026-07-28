# PyData STL Website

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
