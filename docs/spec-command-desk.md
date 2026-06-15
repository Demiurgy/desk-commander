# Спека-промпт: Командный рабочий стол (текущая концепция)

> Артефакт намерения для второго прототипа. Верхний блок — для меня (что и зачем проверяю). Нижний блок («ПРОМПТ») — копируется целиком в Lovable / v0.

---

## Для меня (не вставлять в Lovable)

**Проблема, которую проверяю:** жизнь без работы за деньги всё равно состоит из потоков задач (поиск работы, фитнес, проекты, быт). Хочу проверить гипотезу: рабочий стол полезнее не как пассивная витрина («показать расписание»), а как **движок задач** — поверхность, куда задачи *прилетают*: либо я добавляю их сам, либо их генерят доменные AI-агенты, и часть улетает реальными событиями в календарь.

**Пользователи:** я (один пользователь), позже — партнёр (шаринг).

**Ключевой сценарий (его и проходим в превью):**
1. Открываю стол — вижу очередь задач и что уже стоит в календаре.
2. Жму агента (напр. «Поиск работы») — он накидывает 3 конкретные задачи.
3. Нужные оставляю, лишние удаляю.
4. У важной задачи жму «в календарь», ставлю дату/время — создаётся реальное событие в Google Calendar.
5. Событие тут же видно в блоке расписания.

**Критерий «прототип удался»:** за минуту видно, что задачи приходят из двух источников (я / агент), и любую можно за пару кликов превратить в реальное событие календаря.

**Что осознанно режу в этой версии:** аккаунты/шаринг с партнёром, фоновые агенты по расписанию, аналитику/статистику, мобильную вёрстку как приоритет.

**Открытые вопросы на следующие итерации:**
- Агенты по расписанию (утренний прогон) вместо ручной кнопки.
- Шаринг стола с партнёром (роли — отголосок учебного примера про админку).
- Связь задачи ↔ созданного события (редактирование/отмена из стола).

---

## ПРОМПТ (копировать в Lovable / v0 целиком)

Build a personal "command desk" web app. Single page, light theme, calm warm-neutral palette (#f5f4f0 background, white cards, rounded 16px corners).

**Concept:** a task engine, not a passive dashboard. Tasks arrive two ways — the user adds them, or domain AI-agents generate them.

**Sections (top to bottom):**

1. *Header* — greeting by time of day + today's date.
2. *Agents bar* — 4 pill buttons: 🔍 Поиск работы, 💪 Фитнес и тело, 🏠 Быт, 📚 Проекты/учёба. Clicking shows a loading state, then drops 3 suggested tasks into the queue, tagged as agent-made.
3. *Task queue* — input to add own task + list. Each task row: checkbox, title, a colored domain chip, a source label (Я / 🤖 agent), a "📅 в календарь" button, delete. Clicking 📅 reveals an inline date+time picker → "Создать событие". Scheduled tasks show a green "📅 <when>" note. Filter chips by domain on top.
4. *Calendar block* — read-only list of upcoming events grouped by day (Сегодня / weekday + date), each with time, title, location.

**Domain colors:** job=blue, fitness=green, home=amber, study=purple, general=grey.

Tone: minimal, focused, single-user. Russian UI labels. Desktop-first, but cards stack on narrow screens.
