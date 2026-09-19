# Phase 7 field-test follow-up — 2026-09-19

Branch: `feature/video-cta-mvp`; no merge to main.

## Findings and changes

- The overlay was rendered unconditionally for motion media. Local video now defaults to `last-seconds` / 3 seconds, with Always and Hidden alternatives and a 1–60 second input. Visibility derives from currentTime/duration on time updates, metadata, duration changes, seek, play, pause, end and empty events. A clip shorter than the configured window displays CTA for its entire known duration.
- Embed supports Always/Hidden. Missing or last-seconds embed settings explicitly fall back to Always; the panel explains this. Image rendering and PNG export behavior are unchanged.
- The existing `key={media.src}` already remounted different URLs; it was not proven to cause the reported failure. The key now includes project ID and asset ID. Setup restores src and calls load; cleanup pauses, removes src and releases the resource. Restoring src during setup is necessary for React StrictMode's setup/cleanup/setup cycle. Autoplay play() rejections are caught and show a manual-play message.
- Development console events include loadedmetadata, canplay, play/playing, error, stalled, waiting, seek/pause, currentSrc, error code/message, duration/currentTime, readyState and networkState. Playback failure exposes error details in a collapsible panel in all builds.
- Upload responses now include written byte size; the frontend rejects a reported mismatch. UUID URLs already avoid filename collisions. CORS also permits the 127.0.0.1 frontend origin and exposes range/size headers. Existing Starlette StaticFiles range serving was already correct; no custom range implementation was needed.

## Actual local files / HTTP verification

The exact original file paths were not supplied. Tested existing local files, including the one matching the reported H.264 Main/AAC LC/yuv420p/30fps description:

| Source file in assets/incoming | Bytes | Metadata | Result |
| --- | ---: | --- | --- |
| 4abdc16536924c13bd1cfadc127d6e3a.mp4 | 47,495,200 | H.264 Main, AAC LC, 50fps | Upload, playback, A→B→A passed |
| c1e396fb2b7a41a2a371a14ff4852520.mp4 | 9,940,927 | H.264 Main, AAC LC, yuv420p, 30fps | Upload, playback, A→B→A passed |

Actual fresh HTTP URLs verified after backend restart:

- `http://127.0.0.1:8100/media/9596b311b4c947738ea76f1a6512fc5a.mp4`
- `http://127.0.0.1:8100/media/fd3102f34aea48e08ec32a3c36a95f0b.mp4`

Both returned 200, video/mp4, exact Content-Length, exact upload size and byte-for-byte equal downloads. Browser tests separately verified each fresh A/B/A URL, prefix and suffix Range 206 responses, currentSrc changes, nonzero videoWidth and progressing currentTime. All seven pre-existing MP4 URLs passed full-body equality and prefix range checks.

Two other local MP4s (`56e0…`, `b274…`) failed even in an independent HTML video element with code 4, readyState 0, networkState 3. FFmpeg inspection identified those files as HEVC Main at 24fps, not the reported H.264 file. This does **not** establish a codec cause for the user's H.264 incident. That incident did not reproduce with the matching local H.264 file; its original cause remains unconfirmed. No transcoding or replacement of source media was performed.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed.
- `python -m compileall backend`: passed.
- `python -m unittest backend.test_media`: 4 passed, including upload validation, size equality, GET/HEAD, prefix/suffix ranges, invalid range 416, CORS and preserved AI route configuration-error behavior.
- Playwright / headless Edge: 5 passed, with both field-file environment variables set. Covers image CTA, PNG download, real video upload, A→B→A, autoplay, looping back to hidden CTA, pause/seek visibility, last 3 seconds, adjustable timing, Always/Hidden, reload restore, project switching, embed URLs/Hidden/restore, pending-upload cancellation, playback error diagnostics and AI CTA application preserving media settings.
- AI generation/apply UI uses a deterministic mocked response; no paid live AI request was made. External provider iframe playback itself is not asserted.

Re-run field tests from frontend in PowerShell:

```powershell
$env:CTA_TEST_VIDEO_A='4abdc16536924c13bd1cfadc127d6e3a.mp4'
$env:CTA_TEST_VIDEO_B='c1e396fb2b7a41a2a371a14ff4852520.mp4'
npm run test:media
```

Absolute paths also work. The field-file test skips when paths are absent; other tests use a browser-generated clip or controlled responses. Local media and generated uploads remain ignored and are not committed.
