# Desk Commander

> A personal "command center": not a passive dashboard, but a **task engine**. Tasks arrive from two sources — I add them myself, or domain AI agents propose them — and any task can be pushed to Google Calendar as a real event in one move.

Built as part of learning the **rapid-prototyping loop** (intent → prompt → live prototype → review → next iteration), the way advanced AI PMs do it — not "through chat".

---

## What the prototype does

- **Task queue.** Add tasks manually (the domain is inferred from keywords) or accept them from agents. Filter by domain, mark done.
- **AI agents.** Four domain agents — 🔍 Job search, 💪 Fitness & body, 🏠 Home, 📚 Projects & learning. Each looks at current tasks in its domain and proposes 3 next steps (a live model call).
- **Push to calendar.** Each task has a "📅 to calendar" button: pick a date/time and a **real** event is created in Google Calendar (colored by domain).
- **Live schedule.** The "Upcoming" block reads the next events from Google Calendar and groups them by day.
- **Persistence.** Manual tasks and filters are stored locally in the browser.

## How it works

The prototype is a self-contained HTML page (`app/index.html`) with a **backend-agnostic adapter**: the same buttons work through one of two backends.

1. **Production mode (n8n).** In a browser, the desk sends `POST {action, ...}` to a single n8n workflow webhook. The workflow (`workflows/desk.workflow.json`) branches on `action`:
   - `listEvents` / `createEvent` → Google Calendar (read & create events, OAuth on the n8n side);
   - `agent` → Claude (Haiku) generates 3 tasks.
   The webhook URL lives in `app/config.js` (gitignored — copy it from `app/config.example.js`). The Claude API key and Google OAuth never leave n8n.
2. **Cowork mode.** Opened as a Cowork artifact (with `BACKEND` empty), calls go through the Cowork runtime: `window.cowork.callMcpTool(...)` (calendar) and `window.cowork.askClaude(...)` (agents).

> The Cowork sandbox blocks outbound network requests, so the **n8n version must be opened as a normal web page in a browser**, not inside the Cowork panel. That's exactly the "live prototype → real app" transition.

## Structure

```
.
├── README.md              — this file
├── CHANGELOG.md           — version history
├── DEVLOG.md              — prototyping diary (how we thought)
├── app/
│   └── index.html         — the working prototype (frontend)
├── workflows/
│   └── desk.workflow.json — backend: n8n workflow (importable, no secrets)
└── docs/
    ├── spec-admin-panel-v1.md   — practice intent artifact (role-based admin)
    ├── spec-command-desk.md     — intent artifact + prompt for the current concept
    ├── n8n-setup.md             — building the production backend (what we actually built)
    ├── make-setup.md            — alternative we considered: Make.com
    └── sim-setup.md             — alternative we considered: Sim
```

## Roadmap

- [x] n8n backend: schedule, event creation, agents — on real data.
- [ ] Host the desk on a public domain (currently opened as a local file in a browser).
- [ ] Scheduled agents (a morning auto-run) instead of a manual button.
- [ ] Task ↔ created-event link (edit / cancel from the desk).
- [ ] Share the desk with a partner (roles — from the admin-panel practice example).

## Run locally

```
cp app/config.example.js app/config.js   # then put your n8n webhook URL in config.js
open app/index.html                       # open in a normal browser
```

`config.js` is gitignored, so your webhook URL stays out of the repo. With no `config.js`, the desk falls back to the Cowork runtime.

## Stack

Frontend — plain HTML/CSS/JS, no build step. Backend — an **n8n** workflow (cloud): Google Calendar (OAuth) + Claude (Haiku) for agents. Inside Cowork the same frontend runs through the Cowork runtime.

> Secrets stay out of the repo: the n8n webhook URL lives in the gitignored `app/config.js`; the Claude API key and Google OAuth are stored as credentials inside n8n and are never in these files (including the workflow export).
