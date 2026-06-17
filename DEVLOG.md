# Prototyping diary

Not "what got done" (that's in CHANGELOG) but **how we thought**: hypotheses, pivots, what we deliberately cut. The goal of the project is to master the rapid-prototyping loop: *intent → prompt → live prototype → review → next iteration*.

---

## 2026-06-13 · Practice example: the intent artifact

We walked through the first step of the loop on a neutral example — a role-based admin panel. Main lesson: **a prototype starts not with a prompt but with an intent artifact** — what exactly am I testing and why, which scenario do I walk in the preview, what's my "this prototype succeeded" criterion, and what do I deliberately cut.

Result: `docs/spec-admin-panel-v1.md`.

## 2026-06-15 · Prototype v0.1 — "a desk for myself"

Hypothesis: even without a paid job, life is made of streams (schedule, job search, projects, gym, food, cleaning, stretching) — so I'll build "an admin panel for myself".

Decisions along the way:
- Format — a **live artifact**, not a static file: it pulls real Google Calendar data on every open. That's the "grown-up" way to prototype — a surface on top of real data.
- Before building, I **probed the calendar API** (`list_events`) to build the parser against the real response shape, not guesses. Found: events come with `start.dateTime` or `start.date` (all-day), plus `location`, `conferenceUrl`.
- Data is mixed: the schedule is live, routines/job/projects are manual with localStorage.

## 2026-06-15 · Pivot → v0.2 "task engine"

Key insight while reviewing the first prototype: a passive dashboard is boring. We **pivoted the concept** — the desk becomes a task queue where tasks *arrive*: I add them, or domain AI agents generate them, and some fly off to the calendar as real events.

Forks we locked before building:
- Agents — a **live model call** right in the dashboard (not stubs, not background jobs — those are for later).
- Calendar — **real writes**, not just reads.

## 2026-06-17 · Choosing a backend: Sim → Make → n8n

To run the desk outside Cowork (browser, phone) we need a backend: something to hold the Google access and the model key and return data to the frontend. We had made the frontend **backend-agnostic** ahead of time — it just sends `{action, ...}` to one URL, so the backend tool can change without rewriting anything.

Going through the options (and why):
- **Sim (sim.ai)** — assembled almost the whole workflow, but API deployment turned out to be on a paid plan. Shelved.
- **Zapier** — out: webhooks only on paid plans, returning data to a frontend is awkward.
- **Make.com** — a viable free cloud path (webhooks included), kept the guide as a fallback.
- **n8n cloud** — 14-day trial; enough for a prototype/demo. Built it here.

Lesson: a backend-agnostic frontend = freedom to swap tools. The "which tool" fork shouldn't cost a product rewrite.

## 2026-06-17 · Building n8n together (teaching mode)

Session principle: don't build *for* the user but as a teacher — the user clicks, I explain "why" and verify the result through the MCP connection to n8n (I can see the nodes and run test executions).

What we assembled in the `desk` workflow (one workflow for everything):
`Webhook (POST) → Switch on body.action → {listEvents: Google Calendar Get many · createEvent: Google Calendar Create · agent: Basic LLM Chain + Claude Haiku} → Respond to Webhook`.

End-to-end skeleton first (Webhook → Respond with a stub), confirmed the "pipe" answers, and only then hung the branches. That saved debugging.

Gotchas we learned on (and that's the value):
- **Wrong block.** First added the "API" block (an outbound request) instead of a trigger. The entry in n8n is the **Webhook** node, not "API".
- **MCP access to a workflow** is a separate toggle — a clear illustration of how MCP limits what the assistant can see.
- **"No prompt specified"** on Basic LLM Chain — Prompt was in "auto" mode (looks for `chatInput`). Switched to "Define below".
- **The Cowork sandbox** blocks outbound fetch → "Failed to fetch". So the n8n version lives in a normal browser, not the panel. This *is* the "prototype → app" transition.
- **CORS** — fixed by `Allowed Origins = *` right on the Webhook node (handles preflight too).
- **Timezone** — the Create node has no field of its own; it's taken from the workflow settings. Set `Europe/Belgrade` so events don't drift.

Result: the full loop is live — a task (mine or from an agent) → a real Google Calendar event → schedule display. The backend workflow is saved in `workflows/desk.workflow.json`.

## 2026-06-17 · Localized to English

Moved the whole project to English — UI, agent prompts (so tasks come back in English; updated the live n8n prompt too), and all docs — to make it portfolio/demo-ready.

---

### What I took away about the loop itself
1. Intent artifact first, then the prompt.
2. Before code — probe the real API and build against the facts.
3. Concept pivots are normal; lock each fork with an explicit choice.
4. Cut scope deliberately and write down what was cut and why.
5. Put an abstraction at the boundary with the outside world (a backend adapter) — then swapping tools is cheap.
6. End-to-end skeleton first, then the filling — errors show up immediately.
7. A prototype in a sandbox ≠ an app in production: network, CORS, timezones only surface "for real".
