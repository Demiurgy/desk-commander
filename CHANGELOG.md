# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
The project uses meaningful versions per prototype iteration.

## [Unreleased]
- CORS/preflight and hosting the desk on a public domain (currently opened as a local file).
- Scheduled agents (a morning auto-run).
- Task ↔ created-event link (edit / cancel).
- Share the desk with a partner.

## [0.3.1] — 2026-06-17
### Changed
- Everything localized to English: desk UI, agent prompts (so tasks come back in English), and all repo docs.

## [0.3.0] — 2026-06-17
A live backend: the desk runs outside Cowork, on real Google Calendar and Claude.
### Added
- n8n (cloud) workflow `desk`: one Webhook → Switch on `action` → three branches (`listEvents`, `createEvent`, `agent`) → Respond. Saved in `workflows/desk.workflow.json`.
- `agent` branch: Basic LLM Chain + Anthropic Chat Model (Claude Haiku 4.5) generates 3 tasks.
- Calendar branches: read (`Get many events`) and create (`Create an event`) via Google Calendar OAuth.
- `docs/n8n-setup.md` — step-by-step build of what we actually assembled.
### Changed
- Frontend: the backend adapter now targets a single n8n workflow (`BACKEND.url`), `x-api-key` header, response unwrapping.
- Agent parser tolerates a response as a string / array / fenced ```json.
- Desk timezone → `Europe/Belgrade` (matches the calendar).
### Learned
- The Cowork live artifact blocks outbound fetch → the n8n version runs in a normal browser, not in the panel.
- CORS is solved by the `Allowed Origins` option on the Webhook node; event-creation timezone comes from the workflow settings.

## [0.2.2] — 2026-06-15
### Changed
- Layout per the sketch: greeting + input on the left, "Upcoming" on the right; colored domain dots, Today/Tomorrow labels.

## [0.2.1] — 2026-06-15
### Added
- Backend adapter in the frontend: the same desk works through Cowork OR an external workflow (Sim/n8n) by URL.
### Docs
- `docs/sim-setup.md`, `docs/make-setup.md` — backend options considered along the way.

## [0.2.0] — 2026-06-15
Pivot: from a passive dashboard to a **task engine**.
### Added
- Task queue: manual add + domain auto-detection from keywords.
- Four AI agents (job search, fitness, home, projects) generate tasks via a live model call.
- "To calendar" button on a task: creates a real Google Calendar event, colored by domain.
- Domain filters, toast notifications.
### Changed
- The schedule block became a compact "what's already on the calendar" (read-only).
### Removed
- Weekly habit tracker from v0.1 (replaced by the task queue).

## [0.1.0] — 2026-06-15
First live prototype — a passive desk.
### Added
- Live schedule from Google Calendar for the week ahead.
- Manual blocks: weekly routine tracker (gym, stretching, food, cleaning), job search, projects with progress.
- localStorage persistence for manual data.

## [0.0.1] — 2026-06-13
Project kickoff for learning the prototyping loop.
### Added
- Practice intent artifact: the spec-prompt "Role-based admin panel" (`docs/spec-admin-panel-v1.md`).
