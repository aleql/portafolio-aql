● Two steps:

  1. Drop your video files into public/videos/

  public/
    videos/
      eye-search.mp4
      readright.mp4
      coaniquem.mp4
      alerce.mp4

  Keep them short (10–30s), muted, looping. Recommended: 720p, H.264, under 5MB each.

  2. Add videoUrl to each project in src/data/portfolio.ts

  Read 1 file (ctrl+o to expand)

● Just add one line per project, right after featured: true:

  // Eye-Search
  featured: true,
  videoUrl: '/videos/eye-search.mp4',   // ← add this
  images: [ ... ],

  // ReadRight
  featured: true,
  videoUrl: '/videos/readright.mp4',
  images: [ ... ],

  // COANIQUEM
  featured: true,
  videoUrl: '/videos/coaniquem.mp4',
  images: [ ... ],

  // ALeRCE
  featured: true,
  videoUrl: '/videos/alerce.mp4',
  images: [ ... ],

  That's it. The radar already handles everything else — it reads videoUrl from each project, plays it muted/looping,
  and hides it behind the dark overlay until the sweep passes over that sector. Projects without videoUrl keep using
  their poster image as before.

  ---
  Tips for the clips:

  - Export directly from your game engine (Unity: use the Recorder package; screen record a gameplay session and trim)
  - Aim for seamless loops — the video loops continuously under the radar, only briefly visible when the sweep passes
  - ffmpeg one-liner to compress and ensure compatibility:
  ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1280:720 -b:v 1500k -an output.mp4
  - (-an strips audio since the video is muted anyway)