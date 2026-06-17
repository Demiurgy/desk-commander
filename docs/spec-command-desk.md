# Spec-prompt: Desk Commander (current concept)

> The intent artifact for the second prototype. The top block is for me (what I'm testing and why). The bottom block ("PROMPT") gets pasted whole into Lovable / v0.

---

## For me (don't paste into Lovable)

**Problem being tested:** life without a paid job is still made of task streams (job search, fitness, projects, home). Hypothesis: a desk is more useful not as a passive showcase ("show me the schedule") but as a **task engine** — a surface where tasks *arrive*: either I add them, or domain AI agents propose them, and some fly off to the calendar as real events.

**Users:** me (single user), later — a partner (sharing).

**Key scenario (the one I walk in the preview):**
1. Open the desk — see the task queue and what's already on the calendar.
2. Tap an agent (e.g. "Job search") — it drops 3 concrete tasks.
3. Keep the useful ones, delete the rest.
4. On an important task, hit "to calendar", pick a date/time — a real Google Calendar event is created.
5. The event shows up immediately in the schedule block.

**"Prototype succeeded" criterion:** within a minute it's clear that tasks come from two sources (me / agent), and any of them can become a real calendar event in a couple of clicks.

**Deliberately cut in this version:** accounts/sharing with a partner, scheduled background agents, analytics/stats, mobile-first layout.

**Open questions for later iterations:**
- Scheduled agents (a morning run) instead of a manual button.
- Sharing the desk with a partner (roles — an echo of the admin-panel practice example).
- Task ↔ created-event link (edit/cancel from the desk).

---

## PROMPT (paste into Lovable / v0 whole)

Build a personal "Desk Commander" web app. Single page, light theme, calm warm-neutral palette (#f5f4f0 background, white cards, rounded 16px corners).

**Concept:** a task engine, not a passive dashboard. Tasks arrive two ways — the user adds them, or domain AI agents generate them.

**Sections (top to bottom):**

1. *Header* — greeting by time of day + today's date.
2. *Agents bar* — 4 pill buttons: 🔍 Job search, 💪 Fitness & body, 🏠 Home, 📚 Projects & learning. Clicking shows a loading state, then drops 3 suggested tasks into the queue, tagged as agent-made.
3. *Task queue* — input to add own task + list. Each task row: checkbox, title, a colored domain chip, a source label (Me / 🤖 agent), a "📅 to calendar" button, delete. Clicking 📅 reveals an inline date+time picker → "Create event". Scheduled tasks show a green "📅 <when>" note. Filter chips by domain on top.
4. *Calendar block* — read-only list of upcoming events grouped by day (Today / weekday + date), each with time, title, location.

**Domain colors:** job=blue, fitness=green, home=amber, study=purple, general=grey.

Tone: minimal, focused, single-user. Desktop-first, but cards stack on narrow screens.
