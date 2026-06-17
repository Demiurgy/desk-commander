# Backend on n8n (what we actually built)

Outside Cowork the desk works like this: the frontend sends `POST {action, ...}` to one n8n webhook; the workflow branches on `action` and talks to Google Calendar / Claude. The finished workflow is in `workflows/desk.workflow.json` — import it and attach your own credentials.

## The `desk` workflow

```
Webhook (POST, Allowed Origins: *)
  → Switch (on {{ $json.body.action }}) ─┬─ listEvents  → Google Calendar: Get many events → Respond (All Incoming Items)
                                         ├─ createEvent → Google Calendar: Create an event → Respond (JSON {ok:true})
                                         └─ agent       → Basic LLM Chain + Anthropic Chat Model → Respond (JSON {tasks})
```

## One-time setup

1. An n8n account (cloud — 14-day trial; or self-host for free).
2. Credentials in n8n: **Google Calendar OAuth2** (sign in with your account) and **Anthropic** (Claude API key).

## Build, node by node

1. **Webhook** (this is the entry, NOT the "API" block): HTTP Method = `POST`; Respond = **Using 'Respond to Webhook' Node**; Options → **Allowed Origins (CORS)** = `*`.
2. **Switch** (Rules), three rules, all on `{{ $json.body.action }}` equals: `listEvents` → output 1, `createEvent` → output 2, `agent` → output 3.
3. **listEvents branch:** Google Calendar → Operation **Get Many**, Calendar = yours, `After`/`timeMin` = `{{ $json.body.startTime }}`, `Before`/`timeMax` = `{{ $json.body.endTime }}`, Return All. → **Respond to Webhook**: Respond With = **All Incoming Items** (returns the events array as-is).
4. **createEvent branch:** Google Calendar → Operation **Create**, Start = `{{ $json.body.startTime }}`, End = `{{ $json.body.endTime }}`, Additional Fields: Summary = `{{ $json.body.summary }}`, Description = `{{ $json.body.description }}`. → **Respond to Webhook**: JSON `{ "ok": true }`.
5. **agent branch:** **Basic LLM Chain** (Prompt = **Define below**, text `domain: {{ $json.body.domain }}; existing: {{ $json.body.existing }}`, a system message asking for a JSON array of 3 strings) + an attached **Anthropic Chat Model** (Claude Haiku). → **Respond to Webhook**: JSON `={{ { "tasks": $json.text } }}`.
6. **Timezone:** workflow menu → Settings → **Timezone** = your zone (`Europe/Belgrade`). Otherwise created events drift.
7. **Publish** (in newer versions this is the "activate" — it gives the production URL).

## Wire it to the desk

Take the Webhook's production URL → put it in `app/index.html`:

```js
const BACKEND = {
  url:    "https://<you>.app.n8n.cloud/webhook/<id>",
  apiKey: ""   // webhook has no auth — leave empty
};
```

Open `app/index.html` **in a normal browser** (double-click / "open in browser"). It won't work inside the Cowork panel: the sandbox blocks outbound fetch.

## Gotchas we learned on

- **The entry is the Webhook node, not the "API" block.** The "API" block is an outbound request.
- **MCP access to a workflow** is a separate toggle on the workflow card / in its settings.
- **Basic LLM Chain → "No prompt specified".** The Prompt parameter was "auto" (looks for `chatInput`). Switch it to **Define below**.
- **"Failed to fetch" in Cowork.** That's the panel sandbox, not n8n. Open the desk in a browser.
- **CORS.** The `Allowed Origins` option on the Webhook node (`*`) — also covers preflight.
- **Timezone.** Create has no field of its own — it's taken from the workflow settings.
- **Claude's reply** often comes as a stringified array / fenced ```json — the frontend handles it (`parseList`).

## Sources
- [n8n — Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [n8n — Google Calendar](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)
- [n8n — docs](https://docs.n8n.io/)
