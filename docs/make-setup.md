# Backend via Make.com (cloud, free) — alternative

> We ended up building the backend on n8n (see `n8n-setup.md`). This file is kept as the considered Make.com alternative.

Goal: run the desk outside Cowork (browser, phone). One Make scenario receives requests from the frontend, calls Google Calendar and the model, and returns the answer. No frontend changes — just put the webhook URL into `BACKEND.url`.

## What to prepare (once)

1. A [make.com](https://www.make.com) account — free plan.
2. Google Calendar connects itself when you add the module (Google OAuth window).
3. An OpenAI key — only for agents. The calendar works without it; add agents last.

## Scenario shape

```
Webhooks: Custom webhook  (receives {action, ...})
  → Router ─┬─ [action = listEvents]  → Google Calendar: Search events  → Webhook response {events}
            ├─ [action = createEvent] → Google Calendar: Create an event → Webhook response {ok:true}
            └─ [action = agent]       → OpenAI: Create a completion       → Webhook response {tasks}
```

## Steps

1. **Create scenario + webhook.** Make → Create a new scenario → first module **Webhooks → Custom webhook** → Add → name it (e.g. `desk`) → Save. Make gives a URL like `https://hook.eu2.make.com/xxxxx`. To let Make learn the request fields, hit **Redetermine data structure** and send a test request — then fields become `{{1.action}}`, etc.
2. **Router** (Flow Control → Router). On each branch set a filter (the wrench on the line): `{{1.action}}` Equal to `listEvents` / `createEvent` / `agent`.
3. **listEvents branch** → **Google Calendar → Search events** (Calendar = primary, Start = `{{1.startTime}}`, End = `{{1.endTime}}`, Order by = startTime). Then **Webhooks → Webhook response**: Status 200, Body `{"events": {{2.array}}}`, Custom headers `Content-Type: application/json` and `Access-Control-Allow-Origin: *`.
4. **createEvent branch** → **Google Calendar → Create an event** (fields from `{{1.*}}`). Then **Webhook response**: `{"ok": true}` + the same CORS headers.
5. **agent branch** → **OpenAI → Create a Completion** (system prompt asking for a JSON array of 3 tasks; user message passes `{{1.domain}}` and `{{1.existing}}`). Then **Webhook response**: `{"tasks": {{3.result}}}`.
6. Turn the scenario **ON** and test with `curl`.
7. Put the webhook URL in `BACKEND.url` in `app/index.html` (leave `apiKey` empty).

## Gotchas

- **CORS.** Add `Access-Control-Allow-Origin: *` in every Webhook response, or the browser blocks it.
- **Operations.** Free plan ~1000 ops/month — plenty for personal use.
- **Field mapping.** Module numbers (`{{1.…}}`, `{{2.…}}`) and field names come from Make's hints.
- **OpenAI key.** Lives in Make (server-side); the frontend never sees it.

## Sources
- [Make — Custom webhook + Google Calendar (template with response)](https://www.make.com/en/templates/13067-create-google-calendar-events-from-custom-webhook-data-and-respond-via-webhook)
- [Make — Google Calendar integration](https://www.make.com/en/integrations/google-calendar/make)
