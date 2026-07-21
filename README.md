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
page embeds the recording using YouTube's privacy-enhanced player. Otherwise it
creates a photo slider from supported image files in `photo_directory`. Omit
`youtube_url` when no recording is available, and keep each event's photos in
its own directory. The first filename alphabetically is the initial photo, so
use names such as `01-cover.jpg`, `02-speaker.jpg`, and `03-audience.jpg` to
control the order. A separate `image` property is not needed.
