# Spec-prompt: Role-based admin panel (v1)

> This is your intent artifact (step 1 of the loop). The top block is for you — to remember *what and why you're testing*. The bottom block ("PROMPT") is what you copy whole into v0 / Lovable.

---

## For me (don't paste into v0)

**Problem being tested:** different roles need a different desk. I want to confirm the role split reads clearly and doesn't get in the way of the main scenario — handling requests.

**Users:** Admin (full access), Manager (works with requests, no system settings).

**Key scenario (the one we walk in the preview):**
1. Open the login screen, pick a role.
2. Land on a desk with a list of requests.
3. Open a request, change its status.
4. Go back, sign out, sign in as the other role — see what's available/hidden differently.

**"Prototype succeeded" criterion:** within 30 seconds, with no hints, it's obvious how the Admin desk differs from the Manager one, and the request list can actually be touched.

**Deliberately cut in v1:** real auth, a backend, regular user and guest roles, a charts dashboard. Those are later iterations.

---

## PROMPT (copy into v0 / Lovable whole)

Build a role-based admin panel prototype. Use mock data, no backend.

**Login screen (entry point):**
- Simple screen titled "Sign in".
- Instead of password, two buttons to pick a role: "Enter as Admin" and "Enter as Manager".
- Selecting a role takes the user to the dashboard rendered for that role.
- Add a "Switch role / Sign out" action in the top bar so I can come back here.

**Main screen — Requests list (the core):**
- A data table of support/work requests with columns: ID, Title, Requester, Status (New / In progress / Done), Priority (Low / Medium / High), Created date.
- 8–10 rows of realistic mock data.
- Filters above the table: by Status and by Priority. A search box by title.
- Clicking a row opens a detail panel (side drawer) showing the request fields plus a Status dropdown to change status, and a "Save" button. Changing status updates the row in the table.

**Role differences (must be visually obvious):**
- Left sidebar navigation.
  - Admin sees: Requests, Users, Settings.
  - Manager sees: Requests only.
- Top bar shows the current role as a badge ("Admin" / "Manager").
- On the Requests table, Admin has an extra "Delete" action per row; Manager does not.
- Admin can reassign a request to another person (a "Reassign" control in the detail panel); Manager cannot see it.

**Style:** clean, modern SaaS admin look. Neutral palette, clear typography, comfortable spacing. Desktop-first layout.

Keep all state in the frontend (mock). Make it clickable end to end so I can walk the full scenario.
