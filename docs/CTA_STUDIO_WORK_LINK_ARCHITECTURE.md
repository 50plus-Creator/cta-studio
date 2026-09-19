# CTA Studio / Work Link architecture

## Phase 7: local media MVP

CTAProject.assets.media optionally describes image, video, or embed media. Legacy
hero images work without migration. MP4/WebM uploads are stored under the repository's
ignored assets/incoming directory and served by FastAPI /media. LocalStorage stores
the server URL, never a blob URL or video bytes. Keep this directory when restarting
or updating the application; the URL works while the same local server is available.
The server and frontend use 127.0.0.1:8100 and localhost:5180 respectively.
AI credentials are needed only by the existing AI generation endpoint.

The canvas overlays the existing primary CTA action (or first action), including
localized copy and icon. It remains a visual composition like existing image CTA
cards; it does not introduce a second action or navigation system. Player controls
remain available. PNG export remains image-only; video rendering is out of scope.
YouTube watch/short/embed links and Vimeo player URLs are supported. External embeds
require network access and permission from the provider; they are not offline media.
MP4/WebM container support does not guarantee every codec can play in every browser.

## Future distribution

```text
CTA Studio
    ↓
Distribution / Manifest
    ↓
Sync Agent
    ↓
Local Storage
    ↓
CTA Player
```

Reuse Work Link's Stage → Snapshot → Sync → Restore philosophy for future video
distribution. Stage a complete candidate, snapshot the current version, sync and
verify media, then restore/activate the consistent snapshot with rollback available.
Do not copy Work Link code into CTA Studio. Extract a shared Common Sync Core in a
future phase, with product-specific adapters around it:

```text
Common Sync Core
├─ manifest
├─ version
├─ hashing
├─ transfer
├─ resume
├─ snapshot
└─ rollback
```

Future multi-tenant identifiers: tenantId (owner), campaignId (campaign), mediaId
(asset), deviceId (receiving player), and version (manifest/snapshot revision).
These identifiers and the distribution stack are design decisions, not Phase 7
implementations. Local loopback media URLs must eventually be resolved through a
manifest to device-local assets; they are not portable distribution URLs.

Future phases only: final MP4 rendering, timeline editing, multiple video tracks,
transition editor, Cloud CDN, Multi-Tenant Admin, complete Sync Agent, actual Work
Link Sync Core integration, payments, remote device monitoring, Windows reboot management.

## Running locally

Install Python requirements (`python -m pip install -r requirements.txt`) and frontend
dependencies (`npm ci` in frontend). Run `powershell -ExecutionPolicy Bypass -File
scripts/start-local.ps1` from the repository. Use `-NoBrowser` to skip opening a browser.
The script uses the repository .venv when present, otherwise Python from PATH, writes
logs under ignored logs/, and checks occupied ports before starting hidden processes.
An absent .env is supported. Uploaded files are limited to 512 MB; unsupported
extensions and empty files return explicit errors. This is a local trusted-workstation
service, not a public upload service or a transcoder.

## Verification

Run `npm run build`, `npm run lint`, and `npm run test:media` in frontend after
starting the local servers. Browser tests use installed Microsoft Edge and create
a short playable clip in memory; uploads remain in ignored assets/incoming/.
Run `python -m compileall backend` and `python -m unittest backend.test_media -v`
from the repository (backend tests also require the development package `httpx`).
The browser tests verify image PNG downloads, video playback and overlay bounds,
Range responses, autosave/reload, project switching, invalid embed inputs,
iframe configuration and persistence, and cancellation of stale uploads.
External provider playback must additionally be checked on the deployment network;
iframe DOM/configuration checks alone do not establish successful external playback.
