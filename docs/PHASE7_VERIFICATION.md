# Phase 7 verification — 2026-09-19

- Frontend production build and ESLint: passed.
- Python compileall and three backend unittest cases: passed.
- Two Microsoft Edge browser regression tests: passed. Covered image display,
  CTA edits, autosave/reload, PNG download, real generated video upload and playback,
  autoplay/muted/loop settings, CTA overlay bounds, byte-range serving, media URL
  restoration, project switching, embed validation/normalization, iframe persistence,
  and cancellation of a pending upload after media selection changes.
- Live health endpoint returned `{"status":"ok"}`.
- Local launcher startup and repeated invocation: passed; detects both IPv4 backend
  and IPv6 frontend listeners, avoiding duplicate startup.
- Separate live YouTube playback check in Edge outside the network-restricted
  sandbox: embed `aqz-KE-bpKQ` played, currentTime 13.54 seconds, paused false.
  External playback remains dependent on network/provider availability.
- API tests explicitly unset OPENAI_API_KEY: health and upload still work; existing
  AI endpoint retains its expected 503 response when credentials are absent.
  No paid AI generation call was made during this phase.
- `.env`, assets/incoming/, node_modules/, dist/, browser results, and server logs
  are ignored. Customer videos and generated test media are not committed.

Intentional limits: no MP4 export, timeline, cloud delivery, remote player management,
or Sync Core integration. Persistent local video URLs require the local server and
the corresponding files in assets/incoming/ to remain available.
