# Спека-промпт: Админка с ролями (v1)

> Это твой артефакт намерения (шаг 1 цикла). Верхний блок — для тебя, чтобы помнить *что и зачем проверяем*. Нижний блок («ПРОМПТ») — то, что копируешь целиком в v0 / Lovable.

---

## Для меня (не вставлять в v0)

**Проблема, которую проверяем:** разным ролям нужен разный рабочий стол. Хочу убедиться, что разделение по ролям читается и не мешает основному сценарию — обработке заявок.

**Пользователи:** Админ (полный доступ), Менеджер (работает с заявками, без системных настроек).

**Ключевой сценарий (его и проходим в превью):**
1. Открываю экран логина, выбираю роль.
2. Попадаю на рабочий стол со списком заявок.
3. Открываю заявку, меняю статус.
4. Возвращаюсь, выхожу, захожу под другой ролью — вижу, что доступно/скрыто иначе.

**Критерий «прототип удался»:** за 30 секунд без подсказок видно, чем рабочий стол Админа отличается от Менеджера, и список заявок можно реально потрогать.

**Что НЕ делаем в v1(осознанно режем):** реальную авторизацию, бэкенд, обычного пользователя и гостя, дашборд с графиками. Это следующие итерации.

---

## ПРОМПТ (копировать в v0 / Lovable целиком)

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
