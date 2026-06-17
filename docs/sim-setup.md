# Backend via Sim (sim.ai) — alternative

> We ended up building the backend on n8n (see `n8n-setup.md`); Sim's API deployment requires a paid plan. This file is kept as the considered Sim alternative.

Goal: run the desk outside Cowork. A Sim workflow replaces the Cowork runtime. The frontend is ready: `app/index.html` has a `BACKEND` object where the URL and key go.

## Sim blocks (so you don't get confused)

- **Start** — the workflow entry point. Already there by default. It has NO URL field: the endpoint URL appears after **Deploy**. You just describe the incoming fields (Input Format). Fields are available downstream as `<start.name>`.
- **"API" block** (under Blocks) — an **outbound** request to another service. NOT needed here.
- **Google Calendar** — a ready tool block: reads and creates events.
- **Condition** — rule-based branching (JavaScript, no LLM). Routes the three actions.
- **Agent** — a model call (for generating tasks).
- **Response** — what to return to the caller (our frontend).

## Shape (one workflow)

```
Start (receives {action, ...})
  → Condition (on <start.action>) ─┬─ listEvents  → Google Calendar (list)   → Response {events}
                                   ├─ createEvent → Google Calendar (create) → Response {ok:true}
                                   └─ agent       → Agent                     → Response {tasks}
```

## Condition or Router?

Use **Condition**. It branches on a JavaScript expression with no LLM — fast, deterministic, no token cost. Router decides the route via a model — not needed; `action` arrives as a ready string.

## Steps (Variant A — one workflow)

1. **Start** → Input Format: add fields `action`, `startTime`, `endTime`, `summary`, `timeZone`, `description` (string) and `existing` (array), plus `domain` (string). No URL anywhere — it appears after Deploy. Fields are referenced as `<start.action>` etc. (use the tag dropdown).
2. **Condition** — three conditions, all on `<start.action>` equals: `listEvents` → Google Calendar (list); `createEvent` → Google Calendar (create); `agent` → Agent.
3. **listEvents** → Google Calendar List Events (calendarId `primary`, `timeMin` = `<start.startTime>`, `timeMax` = `<start.endTime>`, singleEvents true, orderBy startTime). → **Response**: return events; the frontend accepts both a bare array and `{events:[...]}`.
4. **createEvent** → Google Calendar Create Event (summary `<start.summary>`, `startDateTime` = `<start.startTime>`, `endDateTime` = `<start.endTime>`, timeZone `<start.timeZone>`, description `<start.description>`). Note: no `colorId` field in Sim's tool. → **Response**: `{ "ok": true }`.
5. **agent** → Agent block (system prompt that maps `domain` and asks for a JSON array of 3 tasks; user message passes `domain` and `existing`). → **Response**: `{ "tasks": <agent.content> }`.
6. **Deploy.** Endpoint is `POST https://sim.ai/api/workflows/{workflow-id}/execute`; the API tab has ready code and an auth key (`x-api-key` header by default).
7. Put the URL/key in `app/index.html`:
   ```js
   const BACKEND = { url: "https://sim.ai/api/workflows/<id>/execute", apiKey: "<key>" };
   ```

## Gotchas

- **CORS.** The browser calls Sim directly → the page origin must be allowed on Sim's side, otherwise it's blocked.
- **Key in code.** `apiKey` sits in the frontend — fine for a personal MVP, but don't commit it to a public repo.
- **Tag names.** `<start.action>` etc. are examples; take exact names from Sim's tag dropdown.
- **Response wrapper.** Sim returns `{ success, output: {...} }` — the frontend already unwraps `output`.

## Sources
- [Sim — Start (entry point)](https://docs.sim.ai/triggers/start)
- [Sim — API Deployment](https://docs.sim.ai/execution/api-deployment)
- [Sim — Condition block](https://docs.sim.ai/blocks/condition)
- [Sim — Google Calendar tool](https://docs.sim.ai/tools/google_calendar)
